from retriever import retrieve

query = "early behavioral signs of autism in children"

results = retrieve(query, top_k=5)

print("\nQUERY:")
print(query)

print("\nRETRIEVED CONTEXT:")
for i, text in enumerate(results, 1):
    print(f"\n--- Result {i} ---")
    print(text[:500])  # first 500 chars only
