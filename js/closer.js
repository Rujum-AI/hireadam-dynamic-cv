// Closer Component - Final step of the funnel
const Closer = {
    config: null,
    container: null,
    selectedDrink: 0,

    // Initialize the component
    init(config, container) {
        this.config = config;
        this.container = container;
        this.selectedDrink = 0;
        console.log('🎯 Initializing Closer component');
        this.render();
        this.initializeContactPopup();
    },

    // Initialize contact popup functionality
    initializeContactPopup() {
        // Remove any existing popup styles
        const existingStyle = document.getElementById('contactPopupStyles');
        if (existingStyle) {
            existingStyle.remove();
        }

        // Add popup styles
        const popupStyles = `
            /* Contact Popup Overlay */
            .contact-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .contact-popup-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            /* Popup Container */
            .contact-popup {
                position: relative;
                background: linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.95) 100%);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 24px;
                padding: 3rem;
                max-width: 500px;
                width: 90%;
                text-align: center;
                transform: scale(0.8) translateY(30px);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                overflow: hidden;
                backdrop-filter: blur(20px);
                box-shadow: 
                    0 20px 40px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.1);
            }

            .contact-popup-overlay.active .contact-popup {
                transform: scale(1) translateY(0);
            }

            /* Animated Background Particles */
            .popup-particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            }

            .popup-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${this.config?.theme?.primary || '#6366f1'};
                border-radius: 50%;
                opacity: 0;
                animation: particleFloat 8s infinite linear;
            }

            .popup-particle:nth-child(1) {
                left: 10%;
                animation-delay: 0s;
                animation-duration: 6s;
            }

            .popup-particle:nth-child(2) {
                left: 30%;
                animation-delay: 2s;
                animation-duration: 8s;
            }

            .popup-particle:nth-child(3) {
                left: 50%;
                animation-delay: 4s;
                animation-duration: 7s;
            }

            .popup-particle:nth-child(4) {
                left: 70%;
                animation-delay: 1s;
                animation-duration: 9s;
            }

            .popup-particle:nth-child(5) {
                left: 90%;
                animation-delay: 3s;
                animation-duration: 6s;
            }

            @keyframes particleFloat {
                0% {
                    bottom: -10px;
                    opacity: 0;
                    transform: translateX(0) scale(1);
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    bottom: 110%;
                    opacity: 0;
                    transform: translateX(20px) scale(1.2);
                }
            }

            /* Popup Glow Effect */
            .popup-glow {
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, ${this.config?.theme?.primary || '#6366f1'}15 0%, transparent 70%);
                animation: glowRotate 10s linear infinite;
                pointer-events: none;
            }

            @keyframes glowRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Close Button */
            .popup-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 40px;
                height: 40px;
                border: none;
                background: rgba(255,255,255,0.05);
                border-radius: 50%;
                color: rgba(255,255,255,0.6);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                font-size: 1.2rem;
                backdrop-filter: blur(10px);
            }

            .popup-close:hover {
                background: rgba(255,255,255,0.1);
                color: #fff;
                transform: rotate(90deg);
            }

            /* Popup Content */
            .popup-header {
                margin-bottom: 2rem;
                position: relative;
                z-index: 2;
            }

            .popup-title {
                font-size: 2rem;
                font-weight: 300;
                color: #fff;
                margin-bottom: 0.5rem;
                background: linear-gradient(135deg, #fff 0%, ${this.config?.theme?.primary || '#6366f1'} 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: -0.02em;
            }

            .popup-subtitle {
                font-size: 1rem;
                color: rgba(255,255,255,0.6);
                font-weight: 300;
            }

            .popup-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                position: relative;
                z-index: 2;
            }

            .popup-contact-option {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.25rem 1.5rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(255,255,255,0.05);
                border-radius: 16px;
                text-decoration: none;
                color: rgba(255,255,255,0.8);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .popup-contact-option::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, ${this.config?.theme?.primary || '#6366f1'}20, transparent);
                transition: left 0.6s ease;
            }

            .popup-contact-option:hover {
                background: rgba(255,255,255,0.05);
                border-color: ${this.config?.theme?.primary || '#6366f1'}40;
                transform: translateX(5px);
                color: #fff;
            }

            .popup-contact-option:hover::before {
                left: 100%;
            }

            .popup-option-icon {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${this.config?.theme?.primary || '#6366f1'}20;
                border-radius: 50%;
                color: ${this.config?.theme?.primary || '#6366f1'};
                font-size: 14px;
                flex-shrink: 0;
                transition: all 0.3s ease;
            }

            .popup-contact-option:hover .popup-option-icon {
                background: ${this.config?.theme?.primary || '#6366f1'};
                color: #fff;
                transform: scale(1.1);
            }

            .popup-option-content {
                text-align: left;
            }

            .popup-option-title {
                font-weight: 600;
                font-size: 1rem;
                margin-bottom: 0.25rem;
            }

            .popup-option-desc {
                font-size: 0.875rem;
                color: rgba(255,255,255,0.5);
            }

            @media (max-width: 768px) {
                .contact-popup {
                    padding: 2rem;
                    margin: 1rem;
                }

                .popup-title {
                    font-size: 1.75rem;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = 'contactPopupStyles';
        styleElement.textContent = popupStyles;
        document.head.appendChild(styleElement);
    },

    // Show contact popup
    showContactPopup() {
        // Create popup if it doesn't exist
        let popup = document.getElementById('contactPopup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'contactPopup';
            popup.className = 'contact-popup-overlay';
            popup.innerHTML = `
                <div class="contact-popup">
                    <div class="popup-glow"></div>
                    <div class="popup-particles">
                        <div class="popup-particle"></div>
                        <div class="popup-particle"></div>
                        <div class="popup-particle"></div>
                        <div class="popup-particle"></div>
                        <div class="popup-particle"></div>
                    </div>
                    
                    <button class="popup-close" onclick="Closer.hideContactPopup()">×</button>
                    
                    <div class="popup-header">
                        <h3 class="popup-title">Let's Connect!</h3>
                        <p class="popup-subtitle">Ready to build something amazing together?</p>
                    </div>
                    
                    <div class="popup-options">
                        <a href="mailto:friadaman@gmail.com?subject=Let's meet for ${this.getSelectedDrinkText()}&body=Hi Adam,%0A%0AI'd love to meet for ${this.getSelectedDrinkText()} to discuss working together.%0A%0ABest regards" class="popup-contact-option">
                            <div class="popup-option-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="popup-option-content">
                                <div class="popup-option-title">Email Me</div>
                                <div class="popup-option-desc">friadaman@gmail.com</div>
                            </div>
                        </a>
                        
                        <a href="https://wa.me/6581580570?text=Hi Adam! I'd love to meet for ${this.getSelectedDrinkText()} to discuss working together." target="_blank" class="popup-contact-option">
                            <div class="popup-option-icon">
                                <i class="fab fa-whatsapp"></i>
                            </div>
                            <div class="popup-option-content">
                                <div class="popup-option-title">WhatsApp</div>
                                <div class="popup-option-desc">Quick chat, faster response</div>
                            </div>
                        </a>
                        
                        <a href="https://linkedin.com/in/adam-fridman" target="_blank" class="popup-contact-option">
                            <div class="popup-option-icon">
                                <i class="fab fa-linkedin"></i>
                            </div>
                            <div class="popup-option-content">
                                <div class="popup-option-title">LinkedIn</div>
                                <div class="popup-option-desc">Let's connect professionally</div>
                            </div>
                        </a>
                        
                        <a href="tel:+972557756877" class="popup-contact-option">
                            <div class="popup-option-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="popup-option-content">
                                <div class="popup-option-title">Call Me</div>
                                <div class="popup-option-desc">+972-55-775-6877</div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(popup);

            // Close on overlay click
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    this.hideContactPopup();
                }
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && popup.classList.contains('active')) {
                    this.hideContactPopup();
                }
            });
        }

        // Show popup with animation
        popup.classList.add('active');
    },

    // Hide contact popup
    hideContactPopup() {
        const popup = document.getElementById('contactPopup');
        if (popup) {
            popup.classList.remove('active');
        }
    },

    // Get selected drink text for contact messages
    getSelectedDrinkText() {
        const closerData = this.config.closer;
        return closerData.drinkOptions[this.selectedDrink] || 'coffee ☕';
    },

    // Apply dynamic theme
    applyTheme() {
        const theme = this.config.theme;
        const styles = `
            .closer-container {
                width: 100%;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%);
                position: relative;
                overflow: hidden;
                font-family: '${theme.fontFamily}', sans-serif;
            }

            .closer-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background-image: 
    radial-gradient(circle at 25% 25%, #cd974c 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, #cd974c 1px, transparent 1px);
  background-size: 50px 50px, 30px 30px;
  pointer-events: none;
  z-index: 1;
  animation: patternFloat 20s ease-in-out infinite;
}

@keyframes patternFloat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, -10px); }
}

            /* Ambient background effect */
            .closer-ambient {
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                background: radial-gradient(circle at 30% 50%, ${theme.primary}08 0%, transparent 50%),
                            radial-gradient(circle at 70% 50%, ${theme.secondary}08 0%, transparent 50%);
                animation: ambientRotate 30s linear infinite;
            }

            @keyframes ambientRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .closer-content {
                position: relative;
                z-index: 10;
                text-align: center;
                max-width: 900px;
                width: 90%;
                padding: 3rem;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 1s forwards;
                margin-top: 0px;
            }

            .closer-headline {
                font-size: clamp(2rem, 4vw, 3.2rem);
                font-weight: 300;
                color: #fff;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, #fff 0%, ${theme.primary} 50%, ${theme.secondary} 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                background-size: 200% 200%;
                animation: gradientShift 8s ease infinite;
                line-height: 1.1;
                letter-spacing: -0.02em;
            }

            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            .closer-subline {
                font-size: clamp(1rem, 2vw, 1.3rem);
                color: rgba(255, 255, 255, 0.4);
                margin-bottom: 2.5rem;
                font-weight: 300;
                letter-spacing: 0.02em;
            }

            .meeting-selector {
                margin-bottom: 3rem;
                position: relative;
            }

            .meeting-text {
                font-size: 1.5rem;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 1.5rem;
                font-weight: 300;
                letter-spacing: -0.01em;
            }

            /* Drink Container Visual */
            .drink-visual-container {
                width: 180px;
                height: 200px;
                margin: 1.5rem auto 2rem;
                position: relative;
            }

            .drink-visual {
                width: 100%;
                height: 100%;
                position: relative;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Coffee Mug */
            .coffee-mug {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 140px;
                height: 160px;
            }

            .mug-body {
                width: 140px;
                height: 140px;
                background: linear-gradient(135deg, #3a2f2f 0%, #1a1515 100%);
                border-radius: 10px 10px 40px 40px;
                position: relative;
                box-shadow: 
                    inset 0 -20px 30px rgba(0,0,0,0.5),
                    0 10px 30px rgba(0,0,0,0.3);
            }

            .mug-handle {
                position: absolute;
                right: -35px;
                top: 30px;
                width: 40px;
                height: 60px;
                border: 8px solid #2a2020;
                border-left: none;
                border-radius: 0 25px 25px 0;
            }

            .coffee-liquid {
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 100px;
                background: linear-gradient(180deg, #2b1810 0%, #1a0f08 100%);
                border-radius: 5px 5px 35px 35px;
                overflow: hidden;
            }

            .coffee-foam {
                position: absolute;
                top: 0;
                width: 100%;
                height: 15px;
                background: linear-gradient(180deg, #d4a574 0%, #c19660 100%);
                opacity: 0.8;
            }

            /* Coffee Steam */
            .coffee-steam-container {
                position: absolute;
                top: -60px;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 100px;
                pointer-events: none;
            }

            .steam-particle {
                position: absolute;
                bottom: 0;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
                border-radius: 50%;
                filter: blur(8px);
                animation: steamRise 4s infinite ease-out;
            }

            .steam-particle:nth-child(1) {
                left: 20%;
                animation-delay: 0s;
            }

            .steam-particle:nth-child(2) {
                left: 50%;
                animation-delay: 1s;
                width: 15px;
                height: 15px;
            }

            .steam-particle:nth-child(3) {
                left: 70%;
                animation-delay: 2s;
                width: 25px;
                height: 25px;
            }

            @keyframes steamRise {
                0% {
                    transform: translateY(0) translateX(0) scale(1);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-40px) translateX(10px) scale(1.2);
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-80px) translateX(20px) scale(1.5);
                    opacity: 0;
                }
            }

            /* Beer Glass */
            .beer-glass {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 180px;
                opacity: 0;
                transition: opacity 0.6s ease;
            }

            .beer-glass.active {
                opacity: 1;
            }

            .coffee-mug.inactive {
                opacity: 0;
            }

            .glass-body {
                width: 120px;
                height: 180px;
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
                border-radius: 5px 5px 10px 10px;
                position: relative;
                box-shadow: 
                    inset 0 0 20px rgba(255,255,255,0.1),
                    0 10px 30px rgba(0,0,0,0.3);
                backdrop-filter: blur(10px);
            }

            .beer-liquid {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 140px;
                background: linear-gradient(180deg, #f4a821 0%, #d48806 100%);
                border-radius: 3px 3px 8px 8px;
                overflow: hidden;
            }

            .beer-foam-top {
                position: absolute;
                top: 0;
                width: 100%;
                height: 30px;
                background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
                border-radius: 3px 3px 0 0;
            }

            /* Beer Bubbles */
            .beer-bubbles {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .bubble {
                position: absolute;
                bottom: 10px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%);
                border-radius: 50%;
                animation: bubbleRise 4s infinite linear;
            }

            .bubble:nth-child(1) {
                left: 20%;
                width: 4px;
                height: 4px;
                animation-delay: 0s;
            }

            .bubble:nth-child(2) {
                left: 40%;
                width: 6px;
                height: 6px;
                animation-delay: 1s;
            }

            .bubble:nth-child(3) {
                left: 60%;
                width: 3px;
                height: 3px;
                animation-delay: 2s;
            }

            .bubble:nth-child(4) {
                left: 80%;
                width: 5px;
                height: 5px;
                animation-delay: 3s;
            }

            .bubble:nth-child(5) {
                left: 30%;
                width: 4px;
                height: 4px;
                animation-delay: 1.5s;
            }

            @keyframes bubbleRise {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-130px) translateX(10px);
                    opacity: 0;
                }
            }

            /* Drink Toggle */
            .drink-toggle {
                display: inline-flex;
                background: rgba(255,255,255,0.03);
                border-radius: 100px;
                padding: 0.25rem;
                position: relative;
                border: 1px solid rgba(255,255,255,0.05);
                backdrop-filter: blur(10px);
            }

            .drink-option {
                padding: 0.75rem 2rem;
                background: transparent;
                border: none;
                color: rgba(255,255,255,0.4);
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                z-index: 2;
                font-family: inherit;
                font-weight: 400;
                letter-spacing: 0.02em;
            }

            .drink-option.active {
                color: #fff;
            }

            .drink-indicator {
                position: absolute;
                top: 0.25rem;
                left: 0.25rem;
                height: calc(100% - 0.5rem);
                width: calc(50% - 0.25rem);
                background: linear-gradient(135deg, ${theme.primary}40, ${theme.secondary}40);
                border-radius: 100px;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(10px);
            }

            .drink-indicator.second {
                left: 50%;
            }

            /* Action Buttons Container */
            .action-buttons-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                margin-top: 2.5rem;
                position: relative;
                z-index: 20;
            }

            .beacon-button {
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 2rem;
                background: rgba(255,255,255,0.03);
                color: white;
                border: 1px solid ${theme.primary}40;
                border-radius: 100px;
                font-size: 1.1rem;
                font-weight: 400;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                font-family: inherit;
                letter-spacing: 0.02em;
                backdrop-filter: blur(10px);
            }

            .beacon-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, ${theme.primary}30, transparent);
                transition: left 0.6s ease;
            }

            .beacon-button:hover {
                transform: translateX(5px);
                background: rgba(255,255,255,0.05);
                border-color: ${theme.primary}60;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }

            .beacon-button:hover::before {
                left: 100%;
            }

            /* Energy Arrow Next to Primary Button */
            .energy-indicator {
                width: 50px;
                height: 50px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .energy-ring-small {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 1px solid ${theme.primary}40;
                border-radius: 50%;
                opacity: 0;
                animation: energyPulseSmall 2s infinite ease-out;
            }

            .energy-ring-small:nth-child(2) {
                animation-delay: 0.5s;
            }

            .energy-ring-small:nth-child(3) {
                animation-delay: 1s;
            }

            @keyframes energyPulseSmall {
                0% {
                    transform: scale(0.5);
                    opacity: 0;
                }
                50% {
                    opacity: 0.5;
                }
                100% {
                    transform: scale(1.3);
                    opacity: 0;
                }
            }

            .arrow-core-small {
                width: 25px;
                height: 25px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .arrow-icon-small::before,
            .arrow-icon-small::after {
                content: '';
                position: absolute;
                background: ${theme.primary};
                transition: all 0.3s ease;
            }

            .arrow-icon-small::before {
                width: 12px;
                height: 2px;
                top: 11px;
                left: 4px;
            }

            .arrow-icon-small::after {
                width: 8px;
                height: 8px;
                border-top: 2px solid ${theme.primary};
                border-right: 2px solid ${theme.primary};
                transform: rotate(45deg);
                top: 8px;
                right: 6px;
            }

            /* Try Another Persona Button - POSITIONED LIKE NEXT STEP ARROWS */
            .try-another-nav {
                position: fixed;
                left: 3rem;
                top: 50%;
                transform: translateY(-50%);
                z-index: 100;
                opacity: 0;
                animation: fadeInRight 1s 1s forwards;
            }

            @keyframes fadeInRight {
                to {
                    opacity: 1;
                }
            }

            .restart-arrow {
                width: 80px;
                height: 80px;
                position: relative;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .restart-arrow:hover {
                transform: scale(1.1);
            }

            .restart-arrow-container {
                width: 100%;
                height: 100%;
                position: relative;
            }

            /* Energy rings for restart button */
            .restart-energy-ring {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px solid ${theme.primary};
                border-radius: 50%;
                opacity: 0;
                animation: energyPulse 2s infinite ease-out;
            }

            .restart-energy-ring:nth-child(1) {
                animation-delay: 0s;
            }

            .restart-energy-ring:nth-child(2) {
                animation-delay: 0.5s;
            }

            .restart-energy-ring:nth-child(3) {
                animation-delay: 1s;
            }

            @keyframes energyPulse {
                0% {
                    transform: scale(0.5);
                    opacity: 0;
                }
                50% {
                    opacity: 0.5;
                }
                100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }

            /* Arrow core for restart */
            .restart-arrow-core {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .restart-arrow-icon {
                width: 30px;
                height: 30px;
                position: relative;
            }

            .restart-arrow-icon::before,
            .restart-arrow-icon::after {
                content: '';
                position: absolute;
                background: ${theme.primary};
                transition: all 0.3s ease;
            }

            .restart-arrow-icon::before {
    width: 24px;
    height: 24px;
    border: 2px solid ${theme.primary};
    border-radius: 50%;
    border-top-color: transparent;
    top: 3px;
    left: 3px;
    box-shadow: 0 0 10px ${theme.primary};
}

.restart-arrow-icon::after {
    width: 0;
    height: 0;
    border-left: 6px solid ${theme.primary};
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    top: 6px;
    right: 8px;
    transform: none;
    box-shadow: 0 0 5px ${theme.primary};
}

            /* Energy particles for restart */
            .restart-energy-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${theme.accent};
                border-radius: 50%;
                animation: restartParticleFlow 2s infinite linear;
            }

            .restart-energy-particle:nth-child(4) {
                top: 50%;
                right: 0;
                animation-delay: 0s;
            }

            .restart-energy-particle:nth-child(5) {
                top: 30%;
                right: 0;
                animation-delay: 0.5s;
            }

            .restart-energy-particle:nth-child(6) {
                top: 70%;
                right: 0;
                animation-delay: 1s;
            }

            @keyframes restartParticleFlow {
                0% {
                    transform: translateX(0) translateY(-50%);
                    opacity: 0;
                }
                20% {
                    opacity: 1;
                }
                80% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(-80px) translateY(-50%);
                    opacity: 0;
                }
            }

            .restart-label {
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                color: rgba(255,255,255,0.5);
                font-size: 0.875rem;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .restart-arrow:hover .restart-label {
                opacity: 1;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .closer-content {
                    padding: 2rem;
                }

                .drink-visual-container {
                    transform: scale(0.8);
                    margin: 1rem auto 2rem;
                }

                .drink-option {
                    padding: 0.75rem 1.5rem;
                    font-size: 1rem;
                }

                .beacon-button {
                    padding: 1.25rem 2.5rem;
                    font-size: 1.1rem;
                }

                .try-another-container {
                    position: static;
                    margin-top: 2rem;
                    text-align: center;
                    display: none; /* Hide on mobile since we use the arrow */
                }

                .action-buttons-container {
                    flex-direction: column;
                    gap: 1rem;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    },

    // Toggle drink selection
    toggleDrink(index) {
        this.selectedDrink = index;
        const indicator = document.querySelector('.drink-indicator');
        const options = document.querySelectorAll('.drink-option');
        const coffeeMug = document.querySelector('.coffee-mug');
        const beerGlass = document.querySelector('.beer-glass');
        
        options.forEach((opt, i) => {
            opt.classList.toggle('active', i === index);
        });
        
        if (indicator) {
            indicator.className = `drink-indicator ${index === 1 ? 'second' : ''}`;
        }

        // Toggle drink visuals
        if (index === 0) {
            // Show coffee
            coffeeMug.classList.remove('inactive');
            beerGlass.classList.remove('active');
        } else {
            // Show beer
            coffeeMug.classList.add('inactive');
            beerGlass.classList.add('active');
        }
    },

    // Reset to persona selection - PROPERLY IMPLEMENTED
    resetToPersonas() {
        // Hide contact popup if open
        this.hideContactPopup();
        
        // Use FunnelController's reset method if available
        if (window.FunnelController && typeof window.FunnelController.reset === 'function') {
            window.FunnelController.reset();
        } else {
            // Fallback - redirect to index.html
            window.location.href = 'index.html';
        }
    },

    // Show contact popup instead of direct sending
    openContactPopup() {
        this.showContactPopup();
    },

    // Render the component
    render() {
        this.applyTheme();

        const closerData = this.config.closer;
        
        const drinkOptions = closerData.drinkOptions.map((drink, index) => `
            <button class="drink-option ${index === 0 ? 'active' : ''}" 
                    onclick="Closer.toggleDrink(${index})">
                ${drink}
            </button>
        `).join('');

        const html = `
            <div class="closer-container">
                <div class="closer-ambient"></div>
                <div class="closer-content">
                    <h2 class="closer-headline">${closerData.headline}</h2>
                    <p class="closer-subline">${closerData.subline}</p>
                    
                    <div class="meeting-selector">
                        <p class="meeting-text">${closerData.meetingText}</p>
                        
                        <div class="drink-visual-container">
                            <div class="drink-visual">
                                <!-- Coffee Mug -->
                                <div class="coffee-mug">
                                    <div class="mug-body">
                                        <div class="mug-handle"></div>
                                        <div class="coffee-liquid">
                                            <div class="coffee-foam"></div>
                                        </div>
                                    </div>
                                    <div class="coffee-steam-container">
                                        <div class="steam-particle"></div>
                                        <div class="steam-particle"></div>
                                        <div class="steam-particle"></div>
                                    </div>
                                </div>
                                
                                <!-- Beer Glass -->
                                <div class="beer-glass">
                                    <div class="glass-body">
                                        <div class="beer-liquid">
                                            <div class="beer-foam-top"></div>
                                            <div class="beer-bubbles">
                                                <div class="bubble"></div>
                                                <div class="bubble"></div>
                                                <div class="bubble"></div>
                                                <div class="bubble"></div>
                                                <div class="bubble"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="drink-toggle">
                            ${drinkOptions}
                            <div class="drink-indicator"></div>
                        </div>
                    </div>
                    
                    <div class="action-buttons-container">
                        <button class="beacon-button" onclick="Closer.openContactPopup()">
                            <span>${closerData.buttonText}</span>
                        </button>
                        <div class="energy-indicator">
                            <div class="energy-ring-small"></div>
                            <div class="energy-ring-small"></div>
                            <div class="energy-ring-small"></div>
                            <div class="arrow-core-small">
                                <div class="arrow-icon-small"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Try Another Persona Button - POSITIONED LIKE NEXT STEP ARROWS -->
                <div class="try-another-nav" onclick="Closer.resetToPersonas()">
                    <div class="restart-arrow">
                        <div class="restart-arrow-container">
                            <div class="restart-energy-ring"></div>
                            <div class="restart-energy-ring"></div>
                            <div class="restart-energy-ring"></div>
                            <div class="restart-energy-particle"></div>
                            <div class="restart-energy-particle"></div>
                            <div class="restart-energy-particle"></div>
                            <div class="restart-arrow-core">
                                <div class="restart-arrow-icon"></div>
                            </div>
                        </div>
                        <span class="restart-label">Try another persona</span>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }
};