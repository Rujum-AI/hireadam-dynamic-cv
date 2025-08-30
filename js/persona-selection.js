// Persona Selection Component
const PersonaSelection = {
    personas: [],
    appInstance: null,

    // Initialize the component
    init(personas, appInstance) {
        this.personas = personas || [];
        this.appInstance = appInstance;
        
        console.log('🎭 Initializing persona selection with', this.personas.length, 'personas');
        
        // Start the typing animation
        this.startTypingAnimation();
    },

    // Natural typing animation
    startTypingAnimation() {
        const text = "Hi, I’m Adam - who’s on the other side?";
        const typingElement = document.getElementById('typingText');
        
        if (!typingElement) {
            console.error('❌ Typing element not found');
            return;
        }

        let index = 0;
        typingElement.textContent = '';
        
        const typeCharacter = () => {
            if (index < text.length) {
                const char = text.charAt(index);
                typingElement.textContent += char;
                index++;
                
                // Natural typing speed - varies by character type
                let delay = 55; // Base speed
                
                // Add variety to make it feel human
                if (char === ' ') delay = 150; // Pause at spaces
                else if (char === ',') delay = 200; // Longer pause at punctuation
                else if (char === '?') delay = 250; // Even longer at question marks
                else delay += Math.random() * 60; // Add randomness (80-140ms)
                
                setTimeout(typeCharacter, delay);
            } else {
                // Animation complete - show cursor briefly then remove
                setTimeout(() => {
                    typingElement.classList.add('typing-complete');
                    this.populatePersonaCards();
                    this.showPersonaCards();
                }, 800);
            }
        };
        
        // Start typing after a brief pause
        setTimeout(typeCharacter, 800);
    },

    // Create and populate persona cards
    populatePersonaCards() {
        const grid = document.getElementById('personaNavGrid');
        if (!grid) {
            console.error('❌ Persona grid not found');
            return;
        }

        grid.innerHTML = '';

        this.personas.forEach((persona) => {
            const card = document.createElement('div');
            card.className = 'persona-nav-card';
            card.dataset.personaId = persona.id;
            
            // Determine if we should use an image or emoji
            const useImage = persona.photo && 
                             (persona.photo.includes('.jpg') || 
                              persona.photo.includes('.png') || 
                              persona.photo.includes('images/'));
            
            const photoElement = useImage
                ? `<img src="${persona.photo}" alt="${persona.name}" class="persona-nav-photo-img">` 
                : `<div class="persona-nav-photo">${persona.photo || '👤'}</div>`;
            
            card.innerHTML = `
                <div class="persona-nav-content">
                    ${photoElement}
                    <div class="persona-nav-info">
                        <div class="persona-nav-name">${persona.name}</div>
                        <div class="persona-nav-role">${persona.role}</div>
                        <div class="persona-nav-quote">"${persona.sample_quote}"</div>
                    </div>
                </div>
            `;

            // Add click handler
            card.addEventListener('click', () => this.selectPersona(persona));
            
            grid.appendChild(card);
        });

        console.log('🎭 Created', this.personas.length, 'persona cards');
    },

    // Show persona cards with staggered animation
    showPersonaCards() {
        const personaCards = document.querySelectorAll('.persona-nav-card');
        
        personaCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200); // 200ms delay between each card
        });
        
        console.log('✨ Animating persona cards');
    },

    // Handle persona selection
    selectPersona(persona) {
        console.log('👆 Persona clicked:', persona.name);
        
        // Add selection visual feedback
        const allCards = document.querySelectorAll('.persona-nav-card');
        allCards.forEach(card => card.style.transform = 'scale(0.95)');
        
        const selectedCard = document.querySelector(`[data-persona-id="${persona.id}"]`);
        if (selectedCard) {
            selectedCard.style.transform = 'scale(1.05)';
            selectedCard.style.borderColor = 'var(--primary-purple)';
        }
        
        // Pass selection to app
        if (this.appInstance) {
            setTimeout(() => {
                this.appInstance.setSelectedPersona(persona);
            }, 300);
        } else {
            console.error('❌ App instance not available');
        }
    }
};