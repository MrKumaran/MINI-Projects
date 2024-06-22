from flask import Flask, render_template, request, jsonify
import os
import ollama

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpeg', 'jpg'}

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

history_file = 'chat_history.txt'
ollama_model = 'qwen2:7b'


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.form.get('message')
    file = request.files.get('file')

    if file and allowed_file(file.filename):
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        with open(filename, 'rb') as f:
            image_data = f.read()
        bot_response = ollama.chat(model=ollama_model, image=image_data, messages=[
            {'role': 'user', 'content': user_message}
        ])
    else:
        bot_response = ollama.chat(model=ollama_model, messages=[
            {'role': 'user', 'content': user_message}
        ])

    bot_message = bot_response['message']['content']
    save_to_history(user_message, bot_message)
    return jsonify(response=bot_message)


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
