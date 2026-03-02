from transformers import pipeline
from rag.retriever import retrieve
import re
from functools import lru_cache

# Optimized pipeline parameters for faster CPU inference
llm = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",
    max_length=150,  # Reduced from 256 for speed
    do_sample=False  # Deterministic generation is faster
)

def clean_text(text):
    # Remove metadata and artifacts from source text
    text = re.sub(r'autismtypeprob[\s\d\.]+', '', text, flags=re.I)
    text = re.sub(r'autismtypereason', '', text, flags=re.I)
    text = re.sub(r'autismprobscorereason', '', text, flags=re.I)
    text = re.sub(r'moretestsrequired\s+\w+', '', text, flags=re.I)
    text = re.sub(r'usertherapist conversation', '', text, flags=re.I)
    
    # Remove raw user metadata if it leaked
    text = re.sub(r'user\s+(age|sex|interests).*?(\n|$)', '', text, flags=re.I)
    
    # Remove context headers if model regurgitates them
    text = re.sub(r'(General Knowledge|Specific Patient Data):?', '', text, flags=re.I)

    # Standard cleaning
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'(true|false)', '', text, flags=re.I)
    return text.strip()

@lru_cache(maxsize=50)
def run_rag(query, top_k=5):
    # 1. Retrieve data (Cached)
    # Tuples are hashable, lists are not - handled inside retrieve but good to note
    chunks = retrieve(query, top_k=top_k)

    # Inject General Knowledge ensures the model always has a definition available
    general_knowledge = (
        "General Knowledge: Autism Spectrum Disorder (ASD) is a developmental disability caused by differences in the brain. "
        "People with ASD often have problems with social communication and interaction, and restricted or repetitive behaviors or interests. "
        "It is a spectrum disorder, meaning it affects each person differently and to varying degrees."
    )
    
    # Combine general knowledge with retrieved specific chunks
    context = general_knowledge + "\n\nSpecific Patient Data:\n" + " ".join(chunks)

    if not context.strip():
        return "The dataset provides limited information for this topic."
    
    # 2. Prompt
    prompt = f"""
You are an expert educational assistant on Autism Spectrum Disorder.

INSTRUCTIONS:
1. Use "General Knowledge" to answer general questions (e.g., "What is autism?").
2. Use "Specific Patient Data" to answer questions about specific people or cases.
3. Do NOT diagnose specific users based on general questions.
4. Keep the answer concise and helpful.

Context:
{context}

Question:
{query}

Answer:
"""

    # 3. Generate
    # Using greedy decoding (do_sample=False) is faster
    result = llm(prompt)
    raw = result[0]["generated_text"] if result else ""
    raw = clean_text(raw)

    # 4. Sentence handling (simple, safe)
    sentences = []
    for s in raw.split("."):
        s = s.strip()
        if len(s.split()) > 3 and s not in sentences:
            sentences.append(s)

    answer = ". ".join(sentences[:5])

    # 5. Friendly fallback (ONLY if needed)
    if len(answer.split()) < 5 and "limited information" not in answer:
         # Lowered threshold for "short answer" check
        pass # Allow short direct answers

    if not answer:
        return "The dataset provides limited information for this topic."

    return answer
