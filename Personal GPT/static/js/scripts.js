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
            addMessage('bot', formatBotResponse(data.response));
        });
    }
}

function formatBotResponse(response) {
    // Replace **text** with <b>text</b> for bold formatting
    response = response.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Ensure each new sentence starts on a new line
    response = response.replace(/(\. |\.\n|\.$)/g, '$1<br>');

    return response;
}

function addMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const iconElement = document.createElement('i');
    if (sender === 'user') {
        iconElement.classList.add('fas', 'fa-user', 'icon');
    } else {
        iconElement.classList.add('fas', 'fa-robot', 'icon');
    }

    const textElement = document.createElement('div');
    textElement.innerHTML = text;  // Use innerHTML to preserve formatting

    messageElement.appendChild(iconElement);
    messageElement.appendChild(textElement);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleHistory() {
    const historyPanel = document.getElementById('history-panel');
    historyPanel.classList.toggle('open');

    if (historyPanel.classList.contains('open')) {
        fetch('/get_history')
        .then(response => response.json())
        .then(data => {
            const historyContent = document.getElementById('history-content');
            historyContent.innerHTML = '';

            data.forEach(entry => {
                const historyMessageElement = document.createElement('div');
                historyMessageElement.classList.add('history-message', entry.sender);

                const iconElement = document.createElement('i');
                if (entry.sender === 'user') {
                    iconElement.classList.add('fas', 'fa-user', 'icon');
                } else {
                    iconElement.classList.add('fas', 'fa-robot', 'icon');
                }

                const textElement = document.createElement('div');
                textElement.innerHTML = formatBotResponse(entry.message);  // Use formatBotResponse for history

                historyMessageElement.appendChild(iconElement);
                historyMessageElement.appendChild(textElement);

                historyContent.appendChild(historyMessageElement);
            });
        });
    }
}
