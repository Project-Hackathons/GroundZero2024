from flask import Flask, request
from openai import OpenAI
from dotenv import load_dotenv
from os import environ
from pinecone import Pinecone
from flask_cors import CORS, cross_origin
import hashlib


load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

client = OpenAI(
    organization=environ.get("OPENAI_ORG"),
    project=environ.get("OPENAI_PROJ"),
)
pc = Pinecone(api_key=environ.get("PINECONE_API_KEY"))
index = pc.Index("entries-db")


@app.route('/put-embeddings', methods=['POST'])
def put_embeddings():
    entry = request.form.get('entry')
    hashed_entry = int(hashlib.sha256(
        entry.encode('utf-8')).hexdigest(), 16) % 10**8

    embedding = client.embeddings.create(
        model="text-embedding-ada-002",
        input=[entry],
        encoding_format="float"
    )

    upsert_response = index.upsert(
        vectors=[
            {
                "id": str(hashed_entry),
                "values": embedding.data[0].embedding,
                "metadata": {
                    "entry": entry
                }
            }
        ],
        namespace="entries_with_embeddings"
    )
    print(upsert_response)

    return {"status": "ok"}, 200


@app.route('/entry-analysis', methods=['POST'])
def entry_analysis():
    entry = request.form.get('entry')

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a therapist reading one of your client's journal entry. Based on his mood and activities, recommend him 3 activities to do."},
            {"role": "user", "content": entry}
        ]
    )

    res = (completion.choices[0].message.content)

    return {"response": res}, 200


@app.route('/suggest-continuation', methods=['POST'])
def suggest_continuation():
    entry = request.form.get('entry')

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a professional journal entry writer. Your friend is having trouble continuing his journal entry. Give 3 actionable suggestions on what he can write about."},
            {"role": "user", "content": entry}
        ]
    )

    res = (completion.choices[0].message.content)

    return {"response": res}, 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)