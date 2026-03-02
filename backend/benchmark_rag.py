import time
from rag.pipeline import run_rag

start_time = time.time()
answer = run_rag("What is autism?")
end_time = time.time()

print(f"Time taken: {end_time - start_time:.4f} seconds")
print(f"Answer length: {len(answer)}")
