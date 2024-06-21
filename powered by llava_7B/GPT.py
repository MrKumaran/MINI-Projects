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
    bot_response = "This is a bot response to: " + user_message  # -------------------------------- Change here bot response
    save_to_history(user_message, bot_response)
    return jsonify(response=bot_response)


@app.route('/get_history', methods=['GET'])
def get_history():
    history = []
    if os.path.exists(history_file):
        with open(history_file, 'r') as f:
            lines = f.readlines()
            for line in lines:
                if line.startswith('User: '):
                    history.append({'sender': 'user', 'message': line.replace('User: ', '').strip()})
                elif line.startswith('Bot: '):
                    history.append({'sender': 'bot', 'message': line.replace('Bot: ', '').strip()})
    else:
        history.append({'sender': 'bot', 'message': 'No chat history available.'})
    return jsonify(history)


def save_to_history(user_message, bot_response):
    with open(history_file, 'a') as f:
        f.write(f'User: {user_message}\nBot: {bot_response}\n\n')


if __name__ == '__main__':
    app.run(debug=True)
