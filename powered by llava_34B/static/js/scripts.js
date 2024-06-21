document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('toggle-history-btn').addEventListener('click', toggleHistory);
document.getElementById('close-history-btn').addEventListener('click', toggleHistory);

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const messageText = inputField.value.trim();
    if (messageText !== '') {
        addMessage('user', messageText);
        inputField.value = '';

        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: messageText }),
        })
        .then(response => response.json())
        .then(data => {
            addMessage('bot', data.response);
        });
    }
}

function addMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleHistory() {
    const historyPanel = document.getElementById('history-panel');
    historyPanel.classList.toggle('open');

    if (historyPanel.classList.contains('open')) {
        fetch('/get_history')
        .then(response => response.text())
        .then(data => {
            document.getElementById('history-content').textContent = data;
        });
    }
}
