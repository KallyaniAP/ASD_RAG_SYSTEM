from flask import Blueprint, request, jsonify
from rag.pipeline import run_rag
from database.mongo import save_interaction

query_bp = Blueprint("query_bp", __name__)

@query_bp.route("/query", methods=["POST"])
def query_rag():
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "Query not provided"}), 400

    user_query = data["query"]

    answer = run_rag(user_query)
    
    # Save interaction to MongoDB
    try:
        save_interaction(user_query, answer)
    except Exception as e:
        print(f"MongoDB logging error: {e}")

    return jsonify({
        "query": user_query,
        "answer": answer
    })
