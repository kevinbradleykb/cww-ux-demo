document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // EmailJS initialization
    emailjs.init("OvxBoAeOh8WVtJn3o");

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    fetch('https://api.jsemail.net/email', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again later.');
    });
});

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        if (testimonials.length > 0) {
            setInterval(nextTestimonial, 5000);
            showTestimonial(currentTestimonial);
        }
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modern Chatbot Functionality
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    const chatIcon = document.querySelector('.chat-icon');
    const closeIcon = document.querySelector('.close-icon');

    let isOpen = false;

    // Toggle chatbot
    function toggleChatbot() {
        isOpen = !isOpen;
        chatbotWidget.classList.toggle('active', isOpen);
        
        if (isOpen) {
            chatIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            chatbotInput.focus();
        } else {
            chatIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', toggleChatbot);

    // Predefined responses for common inquiries
    const responses = {
        'quote': 'I\'d be happy to help you get a quote! Please contact us at 231-352-9253 or fill out our contact form with details about your property size and irrigation needs.',
        'services': 'We offer irrigation system installation, activation, winterization, repairs, and upgrades. We\'ve been serving Northern Michigan since 1985!',
        'system help': 'For existing system issues, our full-time service crew can help diagnose and repair any problems. Common issues include broken sprinkler heads, valve problems, or controller issues.',
        'contact': 'You can reach us at:\n📞 Phone: 231-352-9253\n📍 Address: 360 Day Avenue, Frankfort, MI 49635\n✉️ Use our contact form below for detailed inquiries.',
        'hours': 'We provide service during regular business hours. For emergency repairs during the irrigation season, please call us at 231-352-9253.',
        'warranty': 'Our new systems come with warranties of up to 5 years, giving you confidence in your investment.',
        'experience': 'Crystal Water Works has been transforming Northern Michigan landscapes since 1985 - that\'s over 35 years of expertise!',
        'products': 'We use premium Toro products including 570Z Series Sprinklers, Mini 8 Series, Super 800 Series rotors, Evolution Controllers, and EZ-Flo Plus Valves.',
        'areas': 'We serve all of Northern Michigan including Frankfort, Beulah, Benzonia, Manistee, Bear Lake, Glen Arbor, Leland, Empire, and surrounding areas.'
    };

    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = isUser 
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="white"/></svg>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="white"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typingDiv;
    }

    // Get bot response
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key) || lowerMessage.includes(key.replace(' ', ''))) {
                return response;
            }
        }
        
        // Default response
        return 'Thank you for your message! For specific questions about our irrigation services, please call us at 231-352-9253 or use our contact form. We\'re here to help with all your water management needs!';
    }

    // Handle sending messages
    function sendMessage(message) {
        if (!message.trim()) return;
        
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        // Simulate bot response delay
        setTimeout(() => {
            typingIndicator.remove();
            const response = getBotResponse(message);
            addMessage(response);
        }, 1000 + Math.random() * 1000);
    }

    // Event listeners
    chatbotSend.addEventListener('click', () => {
        sendMessage(chatbotInput.value);
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatbotInput.value);
        }
    });

    // Quick action buttons
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.getAttribute('data-message');
            sendMessage(message);
        });
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !chatbotToggle.contains(e.target) && !chatbotWidget.contains(e.target)) {
            toggleChatbot();
        }
    });
});
