document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const fileInput = document.getElementById('image-input');
    const messageText = inputField.value.trim();
    const file = fileInput.files[0];

    if (messageText !== '' || file) {
        displayMessage('user', messageText, file);

        const formData = new FormData();
        formData.append('message', messageText);
        if (file) {
            formData.append('file', file);
        }

        axios.post('/send_message', formData)
            .then(response => {
                const botMessage = response.data.response;
                displayMessage('bot', botMessage);
                inputField.value = ''; // Clear the input field
                fileInput.value = ''; // Clear the file input
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    } else {
        inputField.value = ''; // Ensure the input field is cleared
        fileInput.value = ''; // Ensure the file input is cleared
    }
}

function displayMessage(sender, message, file = null) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            messageElement.appendChild(img);
            if (message) {
                const textNode = document.createTextNode(message);
                messageElement.appendChild(textNode);
            }
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        reader.readAsDataURL(file);
    } else {
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function toggleHistory() {
    const historyPanel = document.getElementById('chat-history');
    if (historyPanel.classList.contains('hidden')) {
        historyPanel.classList.remove('hidden');
        historyPanel.classList.add('visible');
        loadHistory();
    } else {
        historyPanel.classList.remove('visible');
        historyPanel.classList.add('hidden');
    }
}

function loadHistory() {
    axios.get('/chat_history')
        .then(response => {
            const historyContent = document.getElementById('history-content');
            historyContent.innerHTML = ''; // Clear previous history
            response.data.history.forEach(entry => {
                const userElement = document.createElement('div');
                userElement.classList.add('message', 'user');
                userElement.textContent = entry.user.replace('User: ', '');

                const botElement = document.createElement('div');
                botElement.classList.add('message', 'bot');
                botElement.textContent = entry.bot.replace('Bot: ', '');

                historyContent.appendChild(userElement);
                historyContent.appendChild(botElement);
            });
        })
        .catch(error => {
            console.error('Error loading history:', error);
        });
}