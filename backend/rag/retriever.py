import faiss
import json
import numpy as np
from sentence_transformers import SentenceTransformer

from functools import lru_cache

INDEX_PATH = "embeddings/faiss_index/index.faiss"
CHUNKS_FILE = "data/chunks/autism_chunks.json"

index = faiss.read_index(INDEX_PATH)

with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
    chunks = json.load(f)

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

@lru_cache(maxsize=100)
def retrieve(query, top_k=5):
    # Retrieve relevant chunks based on query
    query_embedding = model.encode([query])
    distances, indices = index.search(np.array(query_embedding), top_k)

    return [chunks[idx]["text"] for idx in indices[0]]
