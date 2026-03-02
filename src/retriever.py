import faiss
import json
import numpy as np
from sentence_transformers import SentenceTransformer

# Paths
INDEX_PATH = "embeddings/faiss_index/index.faiss"
CHUNKS_FILE = "data/chunks/autism_chunks.json"

# Load FAISS index
index = faiss.read_index(INDEX_PATH)

# Load chunks
with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
    chunks = json.load(f)

# Load embedding model (same as used before)
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def retrieve(query, top_k=5):
    """
    Takes a user query and returns top_k most relevant text chunks
    """
    query_embedding = model.encode([query])
    distances, indices = index.search(np.array(query_embedding), top_k)

    results = []
    for idx in indices[0]:
        results.append(chunks[idx]["text"])

    return results
