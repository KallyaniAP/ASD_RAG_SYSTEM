import json
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pathlib import Path

INPUT_FILE = "data/processed/autism_cleaned.json"
OUTPUT_FILE = "data/chunks/autism_chunks.json"

Path("data/chunks").mkdir(parents=True, exist_ok=True)

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    documents = json.load(f)

splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=80
)

chunks = []

for doc in documents:
    text_chunks = splitter.split_text(doc["text"])
    for i, chunk in enumerate(text_chunks):
        chunks.append({
            "chunk_id": f"{doc['doc_id']}_CHUNK_{i}",
            "text": chunk
        })

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(chunks, f, indent=2)

print("Chunking completed successfully.")
print("Total chunks created:", len(chunks))
