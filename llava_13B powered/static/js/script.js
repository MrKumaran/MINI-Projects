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
                inputField.value = ''; // Clear the input field immediately
                fileInput.value = ''; // Clear the file input
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    } else {
        inputField.value = ''; // Clear the input field if no message
        fileInput.value = ''; // Clear the file input if no file
    }
}

function displayMessage(sender, message, file) {
    const chatBox = document.getElementById('chat-box');
    let messageElement;

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            messageElement = `<div class="message ${sender}"><img src="${e.target.result}" alt="Image" /></div>`;
            chatBox.insertAdjacentHTML('beforeend', messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        };

        reader.readAsDataURL(file);
    } else {
        messageElement = `<div class="message ${sender}">${message}</div>`;
        chatBox.insertAdjacentHTML('beforeend', messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function toggleHistory() {
    const historyPanel = document.getElementById('chat-history');
    if (historyPanel.classList.contains('hidden')) {
        historyPanel.classList.remove('hidden');
        historyPanel.classList.add('visible');
        loadHistory(); // Load history when opening the panel
    } else {
        historyPanel.classList.remove('visible');
        historyPanel.classList.add('hidden');
    }
}

function loadHistory() {
    axios.get('/chat_history')
        .then(response => {
            const historyContent = document.getElementById('history-content');
            historyContent.innerHTML = ''; // Clear existing content

            response.data.history.forEach(entry => {
                const userElement = `<div class="message user"><i class="fas fa-user"></i> ${entry.user}</div>`;
                const botElement = `<div class="message bot"><i class="fas fa-robot"></i> ${entry.bot}</div>`;

                historyContent.insertAdjacentHTML('beforeend', userElement + botElement);
            });
        })
        .catch(error => console.error('Error loading history:', error));
}
