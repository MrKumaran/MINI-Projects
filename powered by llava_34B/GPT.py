from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
history_file = 'chat_history.txt'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.json.get('message')
    bot_response = "This is a bot response to: " + user_message
    save_to_history(user_message, bot_response)
    return jsonify(response=bot_response)


@app.route('/get_history', methods=['GET'])
def get_history():
    if os.path.exists(history_file):
        with open(history_file, 'r') as f:
            history = f.read()
    else:
        history = 'No chat history available.'
    return history


def save_to_history(user_message, bot_response):
    with open(history_file, 'a') as f:
        f.write(f'User: {user_message}\n')
        f.write(f'Bot: {bot_response}\n')


if __name__ == '__main__':
    app.run(debug=True)
