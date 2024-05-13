from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
from os import environ
from pinecone import Pinecone
from flask_cors import CORS, cross_origin
import hashlib
from prompt import prompt
import json
from supabase import create_client, Client


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

supabase: Client = create_client(environ.get(
    "SUPABASE_URL"), environ.get("SUPABASE_KEY"))

# load prompts
prompts = prompt()


@app.route('/fetch-entries', methods=['POST'])
def fetch_entries():
    response = supabase.table('entries').select("*").execute()

    print(response.data)
    return {"responses": response.data}, 200


@app.route('/push-entry', methods=['POST'])
def push_entry():
    entry = request.form.get('entry')
    data, count = supabase.table('entries').insert(
        {"entry": entry}).execute()

    return {"data": data, "count": count}, 200


@app.route('/entry-analysis', methods=['POST'])
def entry_analysis():
    entry = request.form.get('entry')

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompts["entry_analysis"]},
            {"role": "user", "content": entry}
        ]
    )

    res = (completion.choices[0].message.content)

    return {"response": json.loads(res)}, 200


@app.route('/suggest-continuation', methods=['POST'])
def suggest_continuation():
    entry = request.form.get('entry')

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompts["suggest_continuation"]},
            {"role": "user", "content": entry}
        ]
    )

    res = (completion.choices[0].message.content)

    return {"response": res}, 200


@app.route('/put-embeddings', methods=['POST'])
def put_embeddings():
    entry = request.form.get('entry')
    entries = entry.split('. ')

    combined_entries = []
    overlap = 2
    for i in range(0, len(entries) - overlap + 1, 2):
        combined_entry = '. '.join(entries[i:i+overlap+1])
        hashed_entry = int(hashlib.sha256(
            combined_entry.encode('utf-8')).hexdigest(), 16) % 10**8
        embedding = client.embeddings.create(  # TODO: create all embeddings at once
            model="text-embedding-ada-002",
            input=combined_entry,
            encoding_format="float"
        )
        combined_entries.append(
            {
                "id": str(hashed_entry),
                "values": embedding.data[0].embedding,
                "metadata": {
                    "entry": combined_entry
                }
            }
        )

    upsert_response = index.upsert(
        vectors=combined_entries,
        namespace="entries_with_embeddings"
    )
    print(upsert_response)

    return {"status": "ok"}, 200


@app.route('/summarise-events', methods=['POST'])
def summarise_events():
    query = request.form.get('query')

    # generate questions a therapist would ask a patient
    # fetch "responses" from pinecone
    # there are some of the things that happened to the patient - what areas should he work on?
    # research based on OTHER vectorDB (expert opinions), google search (if not enough info)
    # fetch "similar experience" from pinecone
    # contextualise each AOI to the "similar experience"
    # summarise

    print(query_embeddings(query).matches)

    return "True"


def query_embeddings(query):
    embedding = client.embeddings.create(
        model="text-embedding-ada-002",
        input=[query],
        encoding_format="float"
    )
    res = index.query(
        namespace="entries_with_embeddings",
        vector=[embedding.data[0].embedding],
        top_k=5, include_metadata=True)
    return res


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
