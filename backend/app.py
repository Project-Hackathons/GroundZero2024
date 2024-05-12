from flask import Flask, request
from openai import OpenAI
from dotenv import load_dotenv
from os import environ
from pinecone import Pinecone
from flask_cors import CORS, cross_origin


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

    embedding = client.embeddings.create(
        model="text-embedding-ada-002",
        input=[entry],
        encoding_format="float"
    )

    upsert_response = index.upsert(
        vectors=[
            {
                "id": "vec1",
                "values": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
                "sparse_values": {
                    "indices": [1, 5],
                    "values": [0.5, 0.5]
                },
                "metadata": {
                    "genre": "drama"
                }
            },
            {
                "id": "vec2",
                "values": [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
                "sparse_values": {
                    "indices": [5, 6],
                    "values": [0.4, 0.5]
                },
                "metadata": {
                    "genre": "action"
                }
            }
        ],
        namespace="example-namespace"
    )

    # TODO: update [0] when using multiple entries
    embedding_vectors = [embedding.data[0].embedding]
    meta = [entry]
    to_upsert = zip(0, embedding_vectors, meta)

    print(embedding_vectors)
    index.upsert(vectors=list(to_upsert))

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