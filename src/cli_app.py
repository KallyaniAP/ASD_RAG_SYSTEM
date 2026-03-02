from generator import generate_answer

print("=" * 60)
print("Autism Screening RAG System (CLI Mode)")
print("Type 'exit' to quit")
print("=" * 60)

while True:
    query = input("\nEnter your query: ").strip()

    if query.lower() == "exit":
        print("\nExiting RAG system. Goodbye.")
        break

    if not query:
        print("Please enter a valid query.")
        continue

    print("\nProcessing your query...\n")
    answer = generate_answer(query)

    print("RAG Answer:")
    print("-" * 40)
    print(answer)
    print("-" * 40)