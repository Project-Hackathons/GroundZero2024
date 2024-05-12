from flask import Flask, request
from openai import OpenAI


app = Flask(__name__)
app.config.from_pyfile('settings.py')


@app.route('/', methods=['POST'])
def hello():
    entry = request.form.get('entry')

    client = OpenAI(
        organization='org-kNwnRBLHkjuC5uYLKFaD9zd2',
        project='proj_1uDpIUHImYbx2ciPLGumZguw',
    )

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": entry}
        ]
    )

    res = (completion.choices[0].message.content)

    return {"response": res}, 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
