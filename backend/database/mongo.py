from pymongo import MongoClient
from datetime import datetime

# Local MongoDB URI
MONGO_URI = "mongodb://localhost:27017/"

client = MongoClient(MONGO_URI)
db = client["asd_rag_db"]
collection = db["query_logs"]

def save_interaction(query, answer):
    document = {
        "query": query,
        "answer": answer,
        "timestamp": datetime.utcnow()
    }
    collection.insert_one(document)

# 🔴 TEST BLOCK (ALWAYS AT BOTTOM)
if __name__ == "__main__":
    save_interaction(
        "test query from mongo file",
        "test answer from mongo file"
    )
    print("Test insert done")
