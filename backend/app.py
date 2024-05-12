from flask import Flask, request
from openai import OpenAI
from dotenv import load_dotenv
from os import environ

load_dotenv()
app = Flask(__name__)

client = OpenAI(
    organization=environ.get("OPENAI_ORG"),
    project=environ.get("OPENAI_PROJ"),
)


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
