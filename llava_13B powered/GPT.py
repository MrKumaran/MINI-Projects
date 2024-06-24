from flask import Flask, render_template, request, jsonify, send_from_directory
import os
import ollama
import base64

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpeg', 'jpg'}

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

history_file = 'chat_history.txt'
ollama_model = 'llava:13b'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.form.get('message')
    file = request.files.get('file')
    bot_response = ""

    if file and allowed_file(file.filename):
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        with open(filename, 'rb') as f:
            image_data = f.read()
        bot_response = ollama.chat(model=ollama_model, messages=[
            {'role': 'user', 'content': user_message, 'image': base64.b64encode(image_data).decode('utf-8')}
        ])
    else:
        bot_response = ollama.chat(model=ollama_model, messages=[
            {'role': 'user', 'content': user_message}
        ])

    save_to_history(user_message, bot_response['message']['content'])

    return jsonify({'status': 'success', 'response': bot_response['message']['content']})

@app.route('/chat_history')
def get_chat_history():
    history = []
    with open(history_file, 'r', encoding='utf-8') as f:
        for line in f.readlines():
            parts = line.strip().split('\n')
            if len(parts) >= 2:
                user, bot = parts[0], parts[1]
                history.append({'user': user, 'bot': bot})
    return jsonify({'history': history})

def save_to_history(user_message, bot_response):
    with open(history_file, 'a') as f:
        f.write(f"User: {user_message}\nBot: {bot_response}\n\n")

if __name__ == '__main__':
    app.run(debug=True)
