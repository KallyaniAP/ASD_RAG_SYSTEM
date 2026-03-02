import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from pathlib import Path

# Files
CHUNKS_FILE = "data/chunks/autism_chunks.json"
INDEX_PATH = "embeddings/faiss_index/index.faiss"

# Create folder if not exists
Path("embeddings/faiss_index").mkdir(parents=True, exist_ok=True)

# Load chunks
with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
    chunks = json.load(f)

texts = [chunk["text"] for chunk in chunks]

print("Total chunks loaded:", len(texts))

# Load embedding model
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Generate embeddings
embeddings = model.encode(texts, show_progress_bar=True)

# Create FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

# Save index
faiss.write_index(index, INDEX_PATH)

print("Embeddings generated and FAISS index saved successfully.")
print("Vector dimension:", dimension)
