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
import threading

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


@app.route('/fetch-entries', methods=['GET'])
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

    def background_tasks():
        # refactor because there are already functions for this. this workaround is because there is no entry param (for now)
        data, count = supabase.table('entries').insert(
            {"entry": entry}).execute()
        print(data, count)

        entries = entry.split('. ')
        print(entries)

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
        print(combined_entries)
        upsert_response = index.upsert(
            vectors=combined_entries,
            namespace="entries_with_embeddings"
        )
        print(upsert_response)

    threading.Thread(target=background_tasks).start()

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


# @app.route('/populate-responses', methods=['POST'])
# def populate_reponses():
#     for entry in ["Beach Day</br></br>Spent the day at the beach with friends. The weather was perfect, and the water was refreshing. We played volleyball, swam, and had a picnic by the shore.</br></br>It's always great to unwind and enjoy the ocean.", "Concert Night</br></br>Went to a live concert tonight. The band was incredible, and the energy in the crowd was electrifying. It felt amazing to hear live music again.</br></br>Definitely a night to remember.", "New Recipe Success</br></br>Tried a new recipe for dinner today - a spicy Thai curry. It turned out fantastic! The flavors were rich and the heat was just right.</br></br>Excited to add this dish to my regular cooking rotation.", "Long Run</br></br>Completed a long run this morning. It was tough, but I pushed through and felt a great sense of accomplishment afterwards. Running helps clear my mind.</br></br>Looking forward to my next running goal.", "Art Gallery Visit</br></br>Visited an art gallery downtown. The exhibits were inspiring, and I discovered a new artist whose work I absolutely love.</br></br>Thinking about taking up painting as a new hobby.", "Car Troubles</br></br>Had some car troubles today - the battery died while I was out. Thankfully, a kind stranger helped me jump-start it. Reminded me of the good in people.</br></br>Need to get the car checked soon.", "Movie Marathon</br></br>Had a movie marathon with some friends today. We watched all our favorite classics and had a great time reminiscing about old times.</br></br>It's the perfect way to spend a lazy Sunday.", "DIY Project</br></br>Started a DIY project this weekend - building a bookshelf. It's coming along nicely, and I'm learning a lot about woodworking.</br></br>Can't wait to see the finished product.", "Nature Walk</br></br>Took a peaceful walk through the nature reserve nearby. The sights and sounds of nature were incredibly calming.</br></br>Feeling more connected to the environment.", "Birthday Celebration</br></br>Celebrated a friend's birthday today. We had a small gathering with cake and presents. It was wonderful to share in the joy and make new memories.</br></br>Grateful for good friends and good times."]:

#         # refactor because there are already functions for this. this workaround is because there is no entry param (for now)
#         data, count = supabase.table('entries').insert(
#             {"entry": entry}).execute()
#         print(data, count)

#         entries = entry.split('. ')
#         print(entries)

#         combined_entries = []
#         overlap = 2
#         for i in range(0, len(entries) - overlap + 1, 2):
#             combined_entry = '. '.join(entries[i:i+overlap+1])
#             hashed_entry = int(hashlib.sha256(
#                 combined_entry.encode('utf-8')).hexdigest(), 16) % 10**8
#             embedding = client.embeddings.create(  # TODO: create all embeddings at once
#                 model="text-embedding-ada-002",
#                 input=combined_entry,
#                 encoding_format="float"
#             )
#             combined_entries.append(
#                 {
#                     "id": str(hashed_entry),
#                     "values": embedding.data[0].embedding,
#                     "metadata": {
#                         "entry": combined_entry
#                     }
#                 }
#             )
#         print(combined_entries)
#         upsert_response = index.upsert(
#             vectors=combined_entries,
#             namespace="entries_with_embeddings"
#         )
#         print(upsert_response)
#     return {"response": "].message.content"}


@app.route('/summarise-events', methods=['POST'])
def summarise_events():
    query = request.form.get('query')

    # generate questions a therapist would ask a patient
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=2,
        messages=[
            {"role": "system", "content": "You are a world-class therapist who enjoys helping people."},
            {"role": "user",
                "content": "Generate three questions a therapist might ask one of their clients to learn more about them. Your response should be in a JSON object. {questions: [Array of questions]}"}
        ]
    )
    questions_array = dict.fromkeys(json.loads(
        completion.choices[0].message.content)["questions"])

    # fetch "responses" from pinecone
    for key in questions_array:
        questions_array[key] = [match['metadata']['entry']
                                for match in query_embeddings(key).matches]

    parsed_questions_array = json.dumps(questions_array)

    # there are some of the things that happened to the patient - what areas should he work on?
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content":
             """You are a world-class therapist who enjoys helping people.
             Indicate the start of a new paragraph with <br/><br/> 
             Indicate the words you want to bold with <b></b>
             """},
            {"role": "user",
                "content":
                    f"""
                    The below JSON object shows an exchange between you and one of your clients about his experience. You are the therapist.
                    {parsed_questions_array}
                    From this exhance, generate three LONG TERM actions that your client can take to achieve better mental health.
                    Remember to contextualise EACH AND EVERY piece of advice to your client's experience. Contextualisation is VERY IMPORTANT.
                    """
             }
        ]
    )

    # research based on OTHER vectorDB (expert opinions), google search (if not enough info)
    # fetch "similar experience" from pinecone
    # contextualise each AOI to the "similar experience"
    # summarise

    # print(query_embeddings(query).matches)

    return {"response": completion.choices[0].message.content}


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
