document.addEventListener('DOMContentLoaded', function() {  

    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownButton.addEventListener('mouseenter', function () {
        dropdownMenu.classList.remove('hidden');
    });

    dropdownButton.addEventListener('mouseleave', function () {
        setTimeout(function() {
            if (!dropdownMenu.matches(':hover')) {
                dropdownMenu.classList.add('hidden');
            }
        }, 100);
    });

    dropdownMenu.addEventListener('mouseenter', function () {
        dropdownMenu.classList.remove('hidden');
    });

    dropdownMenu.addEventListener('mouseleave', function () {
        dropdownMenu.classList.add('hidden');
    });

    // line 3 -24 is for the dropdown

    // Navigation Dropdown
    const dropdownButtons = document.querySelectorAll('.dropdown-trigger');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.nextElementSibling;
            dropdown.classList.toggle('hidden');
        });
    });

    // Law Category Expansion
    const lawCategories = document.querySelectorAll('.law-category');
    lawCategories.forEach(category => {
        category.addEventListener('click', () => {
            const details = category.querySelector('.law-details');
            details.classList.toggle('active');
        });
    });

    // Province Selector
    const provinceSelector = document.getElementById('province-selector');
    if (provinceSelector) {
        provinceSelector.addEventListener('change', function() {
            const selectedProvince = this.value;
            updateProvinceContent(selectedProvince);
        });
    }

    // Helper Functions
    function updateProvinceContent(province) {
        const contentDiv = document.getElementById('province-specific-laws');
        if (!contentDiv) return;

        const provinceData = {
            'on': {
                title: 'Ontario Provincial Laws',
                laws: [
                    'Highway Traffic Act',
                    'Provincial Offences Act',
                    'Cannabis Control Act'
                ]
            },
            'bc': {
                title: 'British Columbia Provincial Laws',
                laws: [
                    'Motor Vehicle Act',
                    'Cannabis Control and Licensing Act',
                    'Environmental Management Act'
                ]
            },
            'ab': {
                title: 'Alberta Provincial Laws',
                laws: [
                    'Motor Vehicle Act',
                    'Cannabis Control and Licensing Act',
                    'Environmental Management Act'
                ]
            },
            // Add more provinces as needed
        };

        const data = provinceData[province];
        if (data) {
            contentDiv.innerHTML = `
                <h3 class="font-bold mt-4">${data.title}</h3>
                <ul class="list-disc ml-6 mt-2">
                    ${data.laws.map(law => `<li>${law}</li>`).join('')}
                </ul>
            `;
        }
    }
    // Chatbot Toggle
    document.getElementById('chatbot-toggle').addEventListener('click', function() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
    });

    // Simple chat functionality
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const input = this.value;
            if (input.trim() !== '') {
                addMessage(input, 'user');
                // Simulate response (replace with actual chatbot API)
                setTimeout(() => {
                    addMessage('I understand you\'re asking about "' + input + '". Let me help you with that...', 'bot');
                }, 1000);
                this.value = '';
            }
        }
    });

    function addMessage(text, sender) {
        const messagesDiv = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'mb-4';
        const message = document.createElement('p');
        message.className = sender === 'user' ? 'text-right text-blue-600' : 'text-gray-600';
        message.textContent = text;
        messageDiv.appendChild(message);
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    /*
    document.addEventListener('DOMContentLoaded', function() {
        const chatToggle = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chat-window');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        let isChatOpen = false;
    
        // Toggle chat window
        chatToggle.addEventListener('click', () => {
            isChatOpen = !isChatOpen;
            chatWindow.style.display = isChatOpen ? 'block' : 'none';
        });
    
        // Handle sending messages
        async function sendMessage(message) {
            // Add user message to chat
            appendMessage('user', message);
    
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message })
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                appendMessage('bot', data.response);
            } catch (error) {
                console.error('Error:', error);
                appendMessage('bot', 'Sorry, I encountered an error. Please try again.');
            }
        }
    
        // Add message to chat window with typing animation
        function appendMessage(sender, message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `mb-4 ${sender === 'user' ? 'text-right' : ''}`;
            
            const messageContent = document.createElement('p');
            messageContent.className = `inline-block p-2 rounded-lg ${
                sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
            }`;
    
            if (sender === 'bot') {
                // Add typing animation for bot messages
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'typing-indicator';
                typingIndicator.textContent = '...';
                messageContent.appendChild(typingIndicator);
                
                // Simulate typing effect
                let i = 0;
                const typeWriter = () => {
                    if (i < message.length) {
                        messageContent.textContent = message.substring(0, i + 1);
                        i++;
                        setTimeout(typeWriter, 20); // Adjust speed as needed
                    }
                };
                setTimeout(typeWriter, 500); // Start typing after a short delay
            } else {
                messageContent.textContent = message;
            }
            
            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    
        // Handle input submission
        document.querySelector('#chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                sendMessage(chatInput.value.trim());
                chatInput.value = '';
            }
        });
    
        document.querySelector('#chat-window button').addEventListener('click', () => {
            if (chatInput.value.trim()) {
                sendMessage(chatInput.value.trim());
                chatInput.value = '';
            }
        });
    });
    */
});