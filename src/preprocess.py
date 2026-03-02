import pandas as pd
import json
import re
from pathlib import Path

INPUT_FILE = "data/raw/autism_dataset.csv"
OUTPUT_FILE = "data/processed/autism_cleaned.json"

Path("data/processed").mkdir(parents=True, exist_ok=True)

df = pd.read_csv(INPUT_FILE)
df = df.dropna().drop_duplicates()

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"[^a-z0-9\s]", "", text)
    return text.strip()

documents = []

for i, row in df.iterrows():
    combined_text = clean_text(row["information"]) + " " + clean_text(row["result"])
    documents.append({
        "doc_id": f"DOC_{i}",
        "text": combined_text
    })

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(documents, f, indent=2)

print("Preprocessing completed successfully.")
