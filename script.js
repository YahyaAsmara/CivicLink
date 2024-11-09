document.addEventListener('DOMContentLoaded', function() {
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

    // Chatbot Functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatbotToggle && chatWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = this.value.trim();
                if (message) {
                    addChatMessage(message, 'user');
                    this.value = '';
                    // Simulate bot response
                    setTimeout(() => {
                        processChatbotResponse(message);
                    }, 1000);
                }
            }
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

    function addChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processChatbotResponse(userMessage) {
        // Simple keyword-based responses
        const responses = {
            'arrest': 'If you\'re arrested, you have the right to remain silent and the right to legal counsel. Would you like to learn more about your rights during arrest?',
            'bail': 'Bail hearings typically occur within 24 hours of arrest. A surety may be required. Would you like more information about the bail process?',
            'lawyer': 'You can contact Legal Aid or the Law Society Referral Service to find a lawyer. Would you like contact information?',
            'trial': 'Criminal trials involve several stages including arraignment, preliminary hearing, and the main trial. Would you like details about a specific stage?',
            'default': 'I can help you understand Canadian criminal law and procedures. What specific aspect would you like to learn more about?'
        };

        let response = responses.default;
        Object.keys(responses).forEach(keyword => {
            if (userMessage.toLowerCase().includes(keyword)) {
                response = responses[keyword];
            }
        });

        addChatMessage(response, 'bot');
    }
});