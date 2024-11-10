document.addEventListener('DOMContentLoaded', function() {  

    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat window
    chatToggle.addEventListener('click', function() {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
        if (chatWindow.style.display === 'block') {
            chatInput.focus();
        }
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = "I'm here to help with legal information. What specific area would you like to learn more about?";
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const messageContent = document.createElement('div');
        messageContent.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageContent.textContent = text;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send button click handler
    sendButton.addEventListener('click', sendMessage);

    // Enter key handler
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    const processSteps = document.querySelectorAll('.process-step');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            } else {
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('opacity-100', 'translate-y-0');
                    entry.target.classList.add('opacity-0', 'translate-y-10');
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    processSteps.forEach(step => {
        observer.observe(step);
    });

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