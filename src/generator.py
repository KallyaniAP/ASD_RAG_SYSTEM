from transformers import pipeline
from retriever import retrieve

# Load lightweight instruction-following LLM
llm = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",
    max_length=256
)

def generate_answer(query, top_k=5):
    # Retrieve relevant context
    retrieved_chunks = retrieve(query, top_k=top_k)
    context = "\n".join(retrieved_chunks)

    # Prompt
    prompt = f"""
You are an educational decision-support assistant.
Use ONLY the information provided in the context below.
Do NOT add external medical knowledge.
Do NOT make a diagnosis.

Context:
{context}

Question:
{query}

Answer:
"""

    response = llm(prompt)
    return response[0]["generated_text"]
