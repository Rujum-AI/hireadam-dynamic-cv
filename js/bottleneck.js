// Bottleneck Component - Second step of the funnel
const Bottleneck = {
    config: null,
    container: null,

    // Initialize the component
    init(config, container) {
        this.config = config;
        this.container = container;
        console.log('🎯 Initializing Bottleneck component');
        this.render();
    },

    // Apply dynamic theme
    applyTheme() {
        const theme = this.config.theme;
        const styles = `
            .bottleneck-container {
                width: 100%;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: #0a0a0a;
                position: relative;
                overflow: hidden;
                padding: 2rem;
                font-family: '${theme.fontFamily}', sans-serif;
            }

            .bottleneck-container::before {
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

            .bottleneck-grid-bg {
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: 
                    linear-gradient(${theme.primary}22 1px, transparent 1px),
                    linear-gradient(90deg, ${theme.primary}22 1px, transparent 1px);
                background-size: 50px 50px;
                opacity: 0.3;
                animation: gridMove 20s linear infinite;
            }

            @keyframes gridMove {
                0% { transform: translate(0, 0); }
                100% { transform: translate(50px, 50px); }
            }

            .bottleneck-content {
                position: relative;
                z-index: 10;
                max-width: 1200px;
                width: 90%;
                margin: -20px auto 0; /* Shift content up even more */
            }

            .bottleneck-headline {
                font-size: clamp(2rem, 4.5vw, 3.2rem);
                font-weight: 300;
                text-align: center;
                margin-bottom: 2.5rem;
                background: linear-gradient(135deg, #fff 0%, ${theme.primary} 50%, ${theme.secondary} 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                background-size: 200% 200%;
                animation: gradientShift 8s ease infinite, dropIn 0.8s forwards;
                line-height: 1.1;
                opacity: 0;
                transform: translateY(30px);
                text-transform: ${theme.fontFamily === 'Bebas Neue' ? 'uppercase' : 'none'};
                letter-spacing: ${theme.fontFamily === 'Bebas Neue' ? '0.05em' : '-0.03em'};
                max-width: 850px;
                margin-left: auto;
                margin-right: auto;
            }

            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            .priorities-container {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
                margin-bottom: 2rem;
                max-width: 1100px;
                margin-left: auto;
                margin-right: auto;
            }

            @media (max-width: 1024px) {
                .priorities-container {
                    grid-template-columns: 1fr;
                    max-width: 550px;
                    gap: 1.25rem;
                }
            }

            .priority-card {
                background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
                border: 1px solid rgba(255,255,255,0.05);
                border-radius: 20px;
                padding: 2rem;
                position: relative;
                overflow: hidden;
                opacity: 0;
                transform: translateY(30px);
                animation: slideUp 0.6s forwards;
                animation-delay: calc(var(--card-index) * 0.15s);
                transition: all 0.3s ease;
                backdrop-filter: blur(20px);
            }

            .priority-card:hover {
                transform: translateY(-10px) scale(1.02);
                border-color: ${theme.primary}40;
                background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }

            .priority-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, ${theme.primary}, transparent);
                transform: translateX(-100%);
                transition: transform 0.6s ease;
            }

            .priority-card:hover::before {
                transform: translateX(100%);
            }

            .priority-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                display: inline-block;
                animation: ${theme.animationSpeed === 'gentle' ? 'gentleBounce' : 'bounce'} 2s infinite;
                animation-delay: calc(var(--card-index) * 0.3s);
            }

            .priority-title {
                font-size: 1.75rem;
                font-weight: 700;
                color: ${theme.accent};
                margin-bottom: 1rem;
                text-transform: ${theme.animationSpeed === 'sharp' ? 'uppercase' : 'none'};
            }

            .priority-proof {
                font-size: 1.125rem;
                color: #fff;
                margin-bottom: 0.75rem;
                font-weight: 600;
                line-height: 1.4;
            }

            .priority-detail {
                font-size: 1rem;
                color: #999;
                line-height: 1.5;
            }

            /* Side Navigation Arrow */
            .next-step-nav {
                position: fixed;
                right: 3rem;
                top: 50%;
                transform: translateY(-50%);
                z-index: 100;
                opacity: 0;
                animation: fadeIn 1s 1.5s forwards;
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

            .energy-ring {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px solid ${theme.primary};
                border-radius: 50%;
                opacity: 0;
                animation: energyPulse 2s infinite ease-out;
            }

            .energy-ring:nth-child(1) { animation-delay: 0s; }
            .energy-ring:nth-child(2) { animation-delay: 0.5s; }
            .energy-ring:nth-child(3) { animation-delay: 1s; }

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

            @keyframes dropIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes flipIn {
                to {
                    opacity: 1;
                    transform: rotateY(0);
                }
            }

            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }

            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }

            @keyframes gentleBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            /* Responsive */
            @media (max-width: 768px) {
                .priorities-container {
                    grid-template-columns: 1fr;
                }

                .priority-card {
                    padding: 1.5rem;
                }

                .bottleneck-headline {
                    margin-bottom: 3rem;
                }

                .bottleneck-cta {
                    padding: 1rem 2rem;
                    font-size: 1rem;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    },

    // Render the component
    render() {
        this.applyTheme();

        const bottleneckData = this.config.bottleneck;
        
        const priorityCards = bottleneckData.priorities.map((priority, index) => `
    <div class="priority-card" style="--card-index: ${index}">
        <div class="priority-icon">${priority.icon}</div>
        <h3 class="priority-title">${priority.title}</h3>
        <p class="priority-proof">${priority.header || priority.proof || ''}</p>
        <p class="priority-detail">${priority.info || priority.detail || ''}</p>
    </div>
`).join('');

        const html = `
            <div class="bottleneck-container">
                <div class="bottleneck-grid-bg"></div>
                <div class="bottleneck-content">
                    <h2 class="bottleneck-headline">${bottleneckData.headline}</h2>
                    <div class="priorities-container">
                        ${priorityCards}
                    </div>
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
                        <span class="arrow-label">${bottleneckData.ctaText}</span>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }
};