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
        const formData = new FormData();
        formData.append('message', messageText);
        if (file) {
            formData.append('file', file);
        }

        axios.post('/send_message', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            addMessage('user', messageText, file ? URL.createObjectURL(file) : null);
            addMessage('bot', response.data.response);
        }).catch(error => {
            console.error('Error sending message:', error);
        });

        inputField.value = '';
        fileInput.value = '';
    }
}

function addMessage(sender, text, imageUrl = null) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    if (imageUrl) {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        messageElement.appendChild(imgElement);
    }

    if (text) {
        const textElement = document.createElement('span');
        textElement.textContent = text;
        messageElement.appendChild(textElement);
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
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
    axios.get('/get_history')
        .then(response => {
            const historyContent = document.getElementById('history-content');
            historyContent.innerHTML = '';
            response.data.forEach(entry => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', entry.sender);
                messageElement.innerHTML = entry.message;
                historyContent.appendChild(messageElement);
            });
        })
        .catch(error => {
            console.error('Error loading history:', error);
        });
}
