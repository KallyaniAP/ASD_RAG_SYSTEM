import re

def clean_text(text):
    # Remove metadata and artifacts from source text
    text = re.sub(r'autismtypeprob[\s\d\.]+', '', text, flags=re.I)
    text = re.sub(r'autismtypereason', '', text, flags=re.I)
    text = re.sub(r'autismprobscorereason', '', text, flags=re.I)
    text = re.sub(r'moretestsrequired\s+\w+', '', text, flags=re.I)
    text = re.sub(r'usertherapist conversation', '', text, flags=re.I)
    
    # Remove raw user metadata if it leaked
    text = re.sub(r'user\s+(age|sex|interests).*?(\n|$)', '', text, flags=re.I)

    # Standard cleaning
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'(true|false)', '', text, flags=re.I)
    return text.strip()

dirty_text = "user age 61 autismtypeprob 06 02 005 autismtypereason Gay shows signs of ASD. moretestsrequired true"
cleaned = clean_text(dirty_text)
print(f"Original: {dirty_text}")
print(f"Cleaned:  {cleaned}")

if "autismtypeprob" not in cleaned and "moretestsrequired" not in cleaned and "user age" not in cleaned:
    print("SUCCESS: Artifacts removed.")
else:
    print("FAILURE: Artifacts remaining.")
