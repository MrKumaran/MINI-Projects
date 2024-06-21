document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


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
