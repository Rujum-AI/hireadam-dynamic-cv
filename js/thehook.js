// The Hook Component - First step of the funnel
const TheHook = {
    config: null,
    container: null,

    // Initialize the component with config
    init(config, container) {
        this.config = config;
        this.container = container;
        console.log('🎣 Initializing The Hook component');
        this.render();
    },

    // Apply theme styles dynamically
    applyTheme() {
        const theme = this.config.theme;
        const styles = `
            .hook-container {
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                position: relative;
                overflow: hidden;
                font-family: '${theme.fontFamily}', sans-serif;
                padding: 2rem;
            }

            .hook-container::before {
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

            .hook-background-shapes {
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: hidden;
                opacity: 0.1;
            }

            .shape-1 {
                position: absolute;
                width: 400px;
                height: 400px;
                background: ${theme.primary};
                border-radius: 50%;
                top: -200px;
                right: -200px;
                filter: blur(100px);
                animation: float-1 20s infinite ease-in-out;
            }

            .shape-2 {
                position: absolute;
                width: 300px;
                height: 300px;
                background: ${theme.secondary};
                border-radius: 50%;
                bottom: -150px;
                left: -150px;
                filter: blur(80px);
                animation: float-2 15s infinite ease-in-out;
            }

            .hook-content {
                position: relative;
                z-index: 10;
                text-align: center;
                max-width: 1100px;
                width: 90%;
                padding: 0;
                margin-top: -40px; /* Shift content up even more to compensate for smaller progress bar */
            }

            .hook-greeting {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 200;
    color: ${theme.primary};
    margin-bottom: 0.25rem;
    opacity: 1;
    letter-spacing: -0.03em;
    min-height: 1.2em;
}

.hook-greeting .typing-cursor {
    border-right: 3px solid ${theme.primary};
    animation: blink 1s infinite;
}

.hook-greeting.typing-complete .typing-cursor {
    border-right: none;
    animation: none;
}

@keyframes blink {
    0%, 50% { border-color: ${theme.primary}; }
    51%, 100% { border-color: transparent; }
}

            .hook-role {
                font-size: clamp(1rem, 2vw, 1.5rem);
                color: rgba(255,255,255,0.3);
                margin-bottom: 2.5rem;
                opacity: 0;
                transform: translateY(20px);
                animation: slideInFade 0.8s 0.2s forwards;
                font-weight: 300;
                letter-spacing: 0.02em;
            }

            .hook-main-line {
                font-size: clamp(1.8rem, 4.5vw, 3.2rem);
                font-weight: 300;
                color: #fff;
                line-height: 1.15;
                margin-bottom: 2.5rem;
                opacity: 0;
                transform: translateY(20px);
                animation: slideInFade 0.8s 0.4s forwards;
                letter-spacing: -0.02em;
                max-width: 950px;
                margin-left: auto;
                margin-right: auto;
            }

            .hook-main-line strong {
                font-weight: 600;
                background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .hook-stats {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                margin-bottom: 3rem;
                flex-wrap: wrap;
                opacity: 0;
                animation: slideInFade 0.8s 0.6s forwards;
                max-width: 900px;
                margin-left: auto;
                margin-right: auto;
            }

            .stat-item {
                text-align: center;
                padding: 1.25rem;
                border-radius: 16px;
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.05);
                min-width: 160px;
                transition: all 0.3s ease;
            }

            .stat-item:hover {
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.03);
                border-color: ${theme.primary}30;
            }

            .stat-value {
                font-size: 1rem;
                font-weight: 400;
                color: rgba(255,255,255,0.8);
                letter-spacing: 0.01em;
            }

            /* Side Navigation Arrow */
            .next-step-nav {
                position: fixed;
                right: 3rem;
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

            .energy-arrow {
                width: 80px;
                height: 80px;
                position: relative;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .energy-arrow:hover {
                transform: scale(1.1);
            }

            .arrow-container {
                width: 100%;
                height: 100%;
                position: relative;
            }

            /* Energy rings */
            .energy-ring {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px solid ${theme.primary};
                border-radius: 50%;
                opacity: 0;
                animation: energyPulse 2s infinite ease-out;
            }

            .energy-ring:nth-child(1) {
                animation-delay: 0s;
            }

            .energy-ring:nth-child(2) {
                animation-delay: 0.5s;
            }

            .energy-ring:nth-child(3) {
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

            /* Arrow core */
            .arrow-core {
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

            .arrow-icon {
                width: 30px;
                height: 30px;
                position: relative;
            }

            .arrow-icon::before,
            .arrow-icon::after {
                content: '';
                position: absolute;
                background: ${theme.primary};
                transition: all 0.3s ease;
            }

            .arrow-icon::before {
                width: 20px;
                height: 2px;
                top: 14px;
                left: 5px;
                box-shadow: 0 0 10px ${theme.primary};
            }

            .arrow-icon::after {
                width: 12px;
                height: 12px;
                border-top: 2px solid ${theme.primary};
                border-right: 2px solid ${theme.primary};
                transform: rotate(45deg);
                top: 9px;
                right: 5px;
                box-shadow: 2px -2px 10px ${theme.primary};
            }

            /* Energy particles */
            .energy-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${theme.accent};
                border-radius: 50%;
                animation: particleFlow 2s infinite linear;
            }

            .energy-particle:nth-child(4) {
                top: 50%;
                left: 0;
                animation-delay: 0s;
            }

            .energy-particle:nth-child(5) {
                top: 30%;
                left: 0;
                animation-delay: 0.5s;
            }

            .energy-particle:nth-child(6) {
                top: 70%;
                left: 0;
                animation-delay: 1s;
            }

            @keyframes particleFlow {
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
                    transform: translateX(80px) translateY(-50%);
                    opacity: 0;
                }
            }

            .arrow-label {
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

            .energy-arrow:hover .arrow-label {
                opacity: 1;
            }

            @keyframes slideInFade {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideArrow {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(8px); }
            }

            @keyframes float-1 {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(100px, 100px) rotate(90deg); }
                50% { transform: translate(-50px, 200px) rotate(180deg); }
                75% { transform: translate(150px, -50px) rotate(270deg); }
            }

            @keyframes float-2 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                33% { transform: translate(150px, -100px) scale(1.1); }
                66% { transform: translate(-100px, -150px) scale(0.9); }
            }

            /* Speed variations based on config */
            ${theme.animationSpeed === 'fast' ? `
                .hook-greeting { animation-duration: 0.5s; }
                .hook-role { animation-duration: 0.5s; animation-delay: 0.1s; }
                .hook-main-line { animation-duration: 0.5s; animation-delay: 0.2s; }
                .hook-stats { animation-duration: 0.5s; animation-delay: 0.3s; }
                .hook-cta-container { animation-duration: 0.5s; animation-delay: 0.4s; }
            ` : ''}

            ${theme.animationSpeed === 'smooth' ? `
                .hook-greeting { animation-duration: 1.2s; }
                .hook-role { animation-duration: 1.2s; animation-delay: 0.3s; }
                .hook-main-line { animation-duration: 1.2s; animation-delay: 0.6s; }
                .hook-stats { animation-duration: 1.2s; animation-delay: 0.9s; }
                .hook-cta-container { animation-duration: 1.2s; animation-delay: 1.2s; }
            ` : ''}

            @media (max-width: 768px) {
                .hook-stats {
                    gap: 1.5rem;
                }
                
                .stat-item {
                    min-width: 120px;
                    padding: 0.75rem;
                }

                .hook-cta {
                    padding: 1rem 2rem;
                    font-size: 1rem;
                }
            }
        `;

        // Inject styles
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    },

    // Render the component
    render() {
        this.applyTheme();

        const hookData = this.config.hook;
        const stats = hookData.stats.map(stat => `
            <div class="stat-item">
                <div class="stat-value">${stat}</div>
            </div>
        `).join('');

        const html = `
            <div class="hook-container">
                <div class="hook-background-shapes">
                    <div class="shape-1"></div>
                    <div class="shape-2"></div>
                </div>
                <div class="hook-content">
                 <p class="hook-role">${hookData.role}</p>
                    <h1 class="hook-greeting" id="hookGreeting"><span class="typing-cursor"></span></h1>
                    <h2 class="hook-main-line">${hookData.mainLine}</h2>
                    <div class="hook-stats">${stats}</div>
                </div>
                
                <!-- Side Navigation -->
                <div class="next-step-nav" onclick="FunnelController.nextStep()">
                    <div class="energy-arrow">
                        <div class="arrow-container">
                            <div class="energy-ring"></div>
                            <div class="energy-ring"></div>
                            <div class="energy-ring"></div>
                            <div class="energy-particle"></div>
                            <div class="energy-particle"></div>
                            <div class="energy-particle"></div>
                            <div class="arrow-core">
                                <div class="arrow-icon"></div>
                            </div>
                        </div>
                        <span class="arrow-label">${hookData.ctaText}</span>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;

        // Start typing animation after a short delay
setTimeout(() => {
    this.startTypingAnimation(hookData.greeting, 'hookGreeting');
}, 500);
    },

    // Add typing animation method
    startTypingAnimation(text, elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let index = 0;
    const cursor = element.querySelector('.typing-cursor');
    cursor.style.marginLeft = '0';
    
    const typeCharacter = () => {
        if (index < text.length) {
            const char = text.charAt(index);
            cursor.insertAdjacentText('beforebegin', char);
            index++;
            
            // Faster typing speed than persona selection
            let delay = 40; // Base speed (was 80 in persona)
            
            if (char === ' ') delay = 80; // Pause at spaces (was 150)
            else if (char === ',') delay = 120; // Longer pause at punctuation (was 200)
            else if (char === '?') delay = 150; // Even longer at question marks (was 250)
            else delay += Math.random() * 30; // Add randomness (was 60)
            
            setTimeout(typeCharacter, delay);
        } else {
            // Animation complete
            element.classList.add('typing-complete');
        }
    };
    
    typeCharacter();
}

};