from flask import Flask
from os import environ
from openai import OpenAI


app = Flask(__name__)
app.config.from_pyfile('settings.py')

client = OpenAI(
    organization='org-kNwnRBLHkjuC5uYLKFaD9zd2',
    project='$proj_1uDpIUHImYbx2ciPLGumZguw',
)


@app.route('/', methods=['GET'])
def hello():
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello!"}
        ]
    )

    return completion, 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
