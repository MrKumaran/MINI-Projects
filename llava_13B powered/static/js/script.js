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
        addMessage('user', messageText);

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
            addMessage('bot', response.data.response);
        }).catch(error => {
            console.error('Error sending message:', error);
        });

        inputField.value = '';
        fileInput.value = '';
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
