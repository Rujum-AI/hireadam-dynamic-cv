// Funnel Controller - Manages the flow between steps with Klofi AI
const FunnelController = {
    currentStep: 0,
    personaConfig: null,
    personaData: null, // Store the full persona data
    container: null,
    steps: ['hook', 'bottleneck', 'closer'],
    klofiContent: {}, // Store AI-generated content

    // Initialize the funnel with a persona
    async init(personaId) {
        console.log('🚀 Initializing funnel for persona:', personaId);
        
        // Load the persona data first
        await this.loadPersonaData(personaId);
        
        // Load configurations
        await this.loadConfig(personaId);
        
        // Create or get funnel container
        this.setupContainer();
        
        // Check Klofi status
        await this.checkKlofiStatus();
        
        // Generate content for all steps with Klofi
        await this.generateAllContent();
        
        // Start the funnel
        this.showStep(0);
    },

    // Load the full persona data
    async loadPersonaData(personaId) {
        try {
            const response = await fetch('/api/personas');
            const personas = await response.json();
            this.personaData = personas.find(p => p.id === personaId);
            console.log('📋 Persona data loaded:', this.personaData);
        } catch (error) {
            console.error('Error loading persona data:', error);
        }
    },

    // Check if Klofi AI is available
    async checkKlofiStatus() {
        try {
            const response = await fetch('/api/klofi/status');
            const status = await response.json();
            console.log('🤖 Klofi status:', status.message);
            return status.status === 'ready';
        } catch (error) {
            console.error('Klofi not available:', error);
            return false;
        }
    },

    // Generate all content with Klofi
async generateAllContent() {
    console.log('🎨 Generating personalized content with Klofi...');
    
    // Show a loading indicator
    this.showLoadingMessage();
    
    let sessionId = null;
    
    try {
        // Generate Hook
        const hookResponse = await fetch('/api/klofi/hook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ persona: this.personaData })
        });
        const hookContent = await hookResponse.json();
        this.klofiContent.hook = hookContent;
        
        // Store session ID from hook response
        sessionId = hookContent.sessionId;
        
        console.log('✅ Hook generated:', hookContent);
        console.log('🤖 AI HOOK CONTENT:', JSON.stringify(hookContent, null, 2));

        // Generate Bottleneck (pass sessionId)
        const bottleneckResponse = await fetch('/api/klofi/bottleneck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                persona: this.personaData,
                sessionId: sessionId 
            })
        });
        const bottleneckContent = await bottleneckResponse.json();
        this.klofiContent.bottleneck = bottleneckContent;
        console.log('✅ Bottleneck generated:', bottleneckContent);
        console.log('🤖 AI BOTTLENECK CONTENT:', JSON.stringify(bottleneckContent, null, 2));

        // Generate Closer (pass sessionId)
        const closerResponse = await fetch('/api/klofi/closer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                persona: this.personaData,
                sessionId: sessionId 
            })
        });
        const closerContent = await closerResponse.json();
        this.klofiContent.closer = closerContent;
        console.log('✅ Closer generated:', closerContent);
        console.log('🤖 AI CLOSER CONTENT:', JSON.stringify(closerContent, null, 2));
        
        // Update the config with Klofi's content
        this.mergeKlofiContent();
        console.log('🎨 FINAL MERGED CONFIG:', this.personaConfig);
        
    } catch (error) {
        console.error('❌ ERROR generating content with Klofi:', error);
        console.log('⚠️ USING FALLBACK CONTENT - AI FAILED!');
        console.log('📋 Fallback reason:', error.message);
    }
    
    // Hide loading message
    this.hideLoadingMessage();
},

    // Merge Klofi content with config
    mergeKlofiContent() {
        let isAiContent = false;
        
        if (this.klofiContent.hook) {
            this.personaConfig.hook = { ...this.personaConfig.hook, ...this.klofiContent.hook };
            isAiContent = true;
        }
        if (this.klofiContent.bottleneck) {
            this.personaConfig.bottleneck = { ...this.personaConfig.bottleneck, ...this.klofiContent.bottleneck };
            isAiContent = true;
        }
        if (this.klofiContent.closer) {
            this.personaConfig.closer = { ...this.personaConfig.closer, ...this.klofiContent.closer };
            isAiContent = true;
        }
        
        console.log('🔄 Content merged with config');
    
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(indicator);
    },

    // Show loading message
    // PART 1: Replace showLoadingMessage function in funnel-controller.js
// ================================================================

// Show loading message with elegant cell/osmosis transition
// Replace showLoadingMessage function in funnel-controller.js
// ================================================================

// Show loading message with color calibration transition
showLoadingMessage() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'klofiLoading';
    loadingDiv.className = 'calibration-transition';
    
    // Get theme colors from config if available
    const themeColor = this.personaConfig?.theme?.primary || '#6366f1';
    const secondaryColor = this.personaConfig?.theme?.secondary || '#8b5cf6';
    
    loadingDiv.innerHTML = `
        <div class="calibration-backdrop"></div>
        <div class="calibration-content">
            <!-- Color calibration ring -->
            <div class="calibration-ring">
                <svg class="ring-svg" width="300" height="300" viewBox="0 0 300 300">
                    <!-- Background circle -->
                    <circle class="ring-track" cx="150" cy="150" r="120" />
                    <!-- Animated progress circle -->
                    <circle class="ring-progress" cx="150" cy="150" r="120" />
                    <!-- Center circle -->
                    <circle class="ring-center" cx="150" cy="150" r="60" />
                </svg>
                
                <!-- Color swatches around the ring -->
                <div class="swatch-container">
                    <div class="swatch swatch-1"></div>
                    <div class="swatch swatch-2"></div>
                    <div class="swatch swatch-3"></div>
                    <div class="swatch swatch-4"></div>
                    <div class="swatch swatch-5"></div>
                    <div class="swatch swatch-6"></div>
                    <div class="swatch swatch-7"></div>
                    <div class="swatch swatch-8"></div>
                </div>
                
                <!-- Energy particles that will flow to buttons -->
                <div class="particle-system">
                    <div class="energy-particle ep-1"></div>
                    <div class="energy-particle ep-2"></div>
                    <div class="energy-particle ep-3"></div>
                    <div class="energy-particle ep-4"></div>
                    <div class="energy-particle ep-5"></div>
                    <div class="energy-particle ep-6"></div>
                </div>
                
                <!-- Center content -->
                <div class="calibration-center">
                    <div class="calibration-text">
                        <div class="calibrating">Calibrating</div>
                        <div class="persona-name">${this.personaData?.name || 'Experience'}</div>
                    </div>
                </div>
            </div>
            
            <!-- Progress indicators -->
            <div class="calibration-status">
                <div class="status-dot active"></div>
                <div class="status-dot"></div>
                <div class="status-dot"></div>
            </div>
        </div>
        
        <style>
            /* Main container */
            .calibration-transition {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 999;
                overflow: hidden;
            }
            
            /* Backdrop with smooth transition */
            .calibration-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
                animation: backdropShift 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            @keyframes backdropShift {
                0% {
                    background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
                }
                100% {
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                }
            }
            
            /* Content container */
            .calibration-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                z-index: 2;
            }
            
            /* Calibration ring container */
            .calibration-ring {
                width: 300px;
                height: 300px;
                position: relative;
                margin: 0 auto 2rem;
            }
            
            /* SVG ring styles */
            .ring-svg {
                position: absolute;
                top: 0;
                left: 0;
                transform: rotate(-90deg);
                opacity: 0;
                animation: fadeIn 0.5s 0.2s forwards;
            }
            
            .ring-track {
                fill: none;
                stroke: rgba(200, 200, 200, 0.1);
                stroke-width: 2;
                animation: trackFade 4s ease-in-out forwards;
            }
            
            @keyframes trackFade {
                0% {
                    stroke: rgba(200, 200, 200, 0.1);
                }
                100% {
                    stroke: rgba(255, 255, 255, 0.05);
                }
            }
            
            .ring-progress {
                fill: none;
                stroke: ${themeColor};
                stroke-width: 2;
                stroke-linecap: round;
                stroke-dasharray: 754;
                stroke-dashoffset: 754;
                animation: ringFill 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                filter: drop-shadow(0 0 10px ${themeColor}40);
            }
            
            @keyframes ringFill {
                to {
                    stroke-dashoffset: 0;
                }
            }
            
            .ring-center {
                fill: rgba(255, 255, 255, 0.02);
                stroke: none;
                animation: centerPulse 2s ease-in-out infinite;
            }
            
            @keyframes centerPulse {
                0%, 100% {
                    opacity: 0.3;
                    r: 60;
                }
                50% {
                    opacity: 0.1;
                    r: 65;
                }
            }
            
            /* Color swatches */
            .swatch-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                animation: swatchRotate 20s linear infinite;
            }
            
            @keyframes swatchRotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
            
            .swatch {
                position: absolute;
                width: 12px;
                height: 12px;
                border-radius: 2px;
                opacity: 0;
                animation: swatchAppear 0.5s forwards;
                transition: all 0.3s ease;
            }
            
            .swatch-1 {
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #ffffff;
                animation-delay: 0.1s;
            }
            
            .swatch-2 {
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                background: #f0f0f0;
                animation-delay: 0.2s;
            }
            
            .swatch-3 {
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #d0d0d0;
                animation-delay: 0.3s;
            }
            
            .swatch-4 {
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                background: #b0b0b0;
                animation-delay: 0.4s;
            }
            
            .swatch-5 {
                top: 60px;
                right: 60px;
                background: #909090;
                animation-delay: 0.5s;
            }
            
            .swatch-6 {
                bottom: 60px;
                right: 60px;
                background: #707070;
                animation-delay: 0.6s;
            }
            
            .swatch-7 {
                bottom: 60px;
                left: 60px;
                background: #505050;
                animation-delay: 0.7s;
            }
            
            .swatch-8 {
                top: 60px;
                left: 60px;
                background: #303030;
                animation-delay: 0.8s;
            }
            
            @keyframes swatchAppear {
                0% {
                    opacity: 0;
                    transform: scale(0);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
                100% {
                    opacity: 0.8;
                    transform: scale(1);
                }
            }
            
            /* Energy particles */
            .particle-system {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            
            .energy-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${themeColor};
                border-radius: 50%;
                opacity: 0;
                box-shadow: 0 0 6px ${themeColor}60;
            }
            
            .ep-1 {
                top: 50%;
                left: 50%;
                animation: particleOrbit1 3s 1s infinite linear;
            }
            
            .ep-2 {
                top: 50%;
                left: 50%;
                animation: particleOrbit2 3s 1.5s infinite linear;
            }
            
            .ep-3 {
                top: 50%;
                left: 50%;
                animation: particleOrbit3 3s 2s infinite linear;
            }
            
            .ep-4 {
                top: 50%;
                left: 50%;
                animation: particleOrbit1 3s 2.5s infinite linear;
            }
            
            .ep-5 {
                top: 50%;
                left: 50%;
                animation: particleOrbit2 3s 3s infinite linear;
            }
            
            .ep-6 {
                top: 50%;
                left: 50%;
                animation: particleOrbit3 3s 3.5s infinite linear;
            }
            
            @keyframes particleOrbit1 {
                0% {
                    transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg);
                    opacity: 0;
                }
            }
            
            @keyframes particleOrbit2 {
                0% {
                    transform: translate(-50%, -50%) rotate(120deg) translateX(100px) rotate(-120deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) rotate(480deg) translateX(100px) rotate(-480deg);
                    opacity: 0;
                }
            }
            
            @keyframes particleOrbit3 {
                0% {
                    transform: translate(-50%, -50%) rotate(240deg) translateX(100px) rotate(-240deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) rotate(600deg) translateX(100px) rotate(-600deg);
                    opacity: 0;
                }
            }
            
            /* Center content */
            .calibration-center {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 3;
            }
            
            .calibration-text {
                color: #999;
                animation: textColorShift 4s ease-in-out forwards;
            }
            
            @keyframes textColorShift {
                0% {
                    color: #999;
                }
                100% {
                    color: rgba(255, 255, 255, 0.9);
                }
            }
            
            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }
            
            .calibrating {
                font-size: 0.875rem;
                font-weight: 400;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                margin-bottom: 0.5rem;
                opacity: 0;
                animation: fadeIn 0.5s 0.5s forwards;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
            }
            
            .persona-name {
                font-size: 1.5rem;
                font-weight: 300;
                letter-spacing: 0.02em;
                opacity: 0;
                animation: fadeIn 0.5s 0.7s forwards;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                background: linear-gradient(135deg, ${themeColor}, ${secondaryColor});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            /* Status dots */
            .calibration-status {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                opacity: 0;
                animation: fadeIn 0.5s 1s forwards;
            }
            
            .status-dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: rgba(150, 150, 150, 0.3);
                transition: all 0.3s ease;
            }
            
            .status-dot.active {
                background: ${themeColor};
                box-shadow: 0 0 10px ${themeColor}60;
                animation: dotPulse 1s ease-in-out infinite;
            }
            
            @keyframes dotPulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.5);
                }
            }
            
            /* Animate status dots */
            .calibration-status .status-dot:nth-child(1) {
                animation-delay: 0s;
            }
            
            .calibration-status .status-dot:nth-child(2) {
                animation: dotActivate 4s 1.3s forwards;
            }
            
            .calibration-status .status-dot:nth-child(3) {
                animation: dotActivate 4s 2.6s forwards;
            }
            
            @keyframes dotActivate {
                0% {
                    background: rgba(150, 150, 150, 0.3);
                }
                100% {
                    background: ${themeColor};
                    box-shadow: 0 0 10px ${themeColor}60;
                }
            }
            
            /* Mobile adjustments */
            @media (max-width: 768px) {
                .calibration-ring {
                    width: 240px;
                    height: 240px;
                }
                
                .ring-svg {
                    width: 240px;
                    height: 240px;
                }
                
                .ring-track,
                .ring-progress {
                    r: 95;
                }
                
                .ring-center {
                    r: 45;
                }
                
                .ring-progress {
                    stroke-dasharray: 597;
                    stroke-dashoffset: 597;
                }
                
                .swatch {
                    width: 10px;
                    height: 10px;
                }
                
                .calibrating {
                    font-size: 0.75rem;
                }
                
                .persona-name {
                    font-size: 1.25rem;
                }
                
                .energy-particle {
                    width: 3px;
                    height: 3px;
                }
                
                @keyframes particleOrbit1,
                @keyframes particleOrbit2,
                @keyframes particleOrbit3 {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg) translateX(80px) rotate(0deg);
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg);
                    }
                }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);
},

    // Hide loading message
    hideLoadingMessage() {
        const loadingDiv = document.getElementById('klofiLoading');
        if (loadingDiv) {
            loadingDiv.style.transition = 'opacity 0.5s';
            loadingDiv.style.opacity = '0';
            setTimeout(() => loadingDiv.remove(), 500);
        }
    },

    // Load persona configuration (existing method)
    async loadConfig(personaId) {
        try {
            const response = await fetch('/data/funnel-configs.json');
            const configs = await response.json();
            this.personaConfig = configs[personaId];
            
            if (!this.personaConfig) {
                console.error('No config found for persona:', personaId);
                // Fallback to CEO config
                this.personaConfig = configs.ceo;
            }
            
            console.log('✅ Base config loaded:', this.personaConfig);
        } catch (error) {
            console.error('Error loading config:', error);
            // Use a default config as fallback
            this.personaConfig = this.getDefaultConfig();
        }
    },

    // Setup the funnel container
    setupContainer() {
        // Hide the persona selection
        const personaSelection = document.getElementById('personaSelectionStep');
        if (personaSelection) {
            personaSelection.style.display = 'none';
        }

        // Check if funnel container exists
        let funnelContainer = document.getElementById('funnelContainer');
        if (!funnelContainer) {
            // Create funnel container
            funnelContainer = document.createElement('div');
            funnelContainer.id = 'funnelContainer';
            funnelContainer.className = 'funnel-container';
            funnelContainer.style.background = 'transparent';

            // Add to main content
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.appendChild(funnelContainer);
            } else {
                document.body.appendChild(funnelContainer);
            }
        }

        this.container = funnelContainer;

        // Add progress bar
        
    },

    // Add progress bar to track funnel progress
    addProgressBar() {
        const existingBar = document.getElementById('funnelProgress');
        if (existingBar) {
            existingBar.remove();
        }

        // Get persona-specific progress labels
        const progressLabels = this.getProgressLabels();

        const progressBar = document.createElement('div');
        progressBar.id = 'funnelProgress';
        progressBar.className = 'funnel-progress';
        progressBar.innerHTML = `
            <div class="progress-container">
                <div class="progress-inner">
                    <div class="progress-line">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-steps">
                        <div class="progress-step active" data-step="0">
                            <div class="step-dot"></div>
                            <span class="step-label">${progressLabels[0].label}</span>
                        </div>
                        <div class="progress-step" data-step="1">
                            <div class="step-dot"></div>
                            <span class="step-label">${progressLabels[1].label}</span>
                        </div>
                        <div class="progress-step" data-step="2">
                            <div class="step-dot"></div>
                            <span class="step-label">${progressLabels[2].label}</span>
                        </div>
                    </div>
                </div>
                <div class="progress-thought">
                    <span class="thought-text" id="progressThought">${progressLabels[0].thought}</span>
                </div>
            </div>
        `;

        // Add styles for progress bar
        const styles = `
            .funnel-container {
                width: 100%;
                min-height: 100vh;
                position: relative;
                background: transparent;
                margin: 0;
                padding: 0;
            }

            .funnel-progress {
                position: fixed;
                top: 85px;
                left: 0;
                right: 0;
                z-index: 100;
                padding: 0.5rem 0;
                pointer-events: none;
                background: transparent;
            }

            .progress-container {
                max-width: 500px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .progress-inner {
                position: relative;
            }

            .progress-line {
                position: absolute;
                top: 8px;
                left: 0;
                right: 0;
                height: 1px;
                background: rgba(255, 255, 255, 0.1);
            }

            .progress-fill {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: rgba(255, 255, 255, 0.3);
                transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .progress-steps {
                display: flex;
                justify-content: space-between;
                position: relative;
            }

            .progress-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                pointer-events: auto;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .step-dot {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgba(20, 20, 20, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.2);
                position: relative;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .step-dot::after {
                content: '';
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transition: all 0.3s ease;
            }

            .progress-step.active .step-dot {
                border-color: #fff;
                background: ${this.personaConfig?.theme?.primary || '#6366f1'};
                box-shadow: 0 0 15px ${this.personaConfig?.theme?.primary || '#6366f1'}60;
                transform: scale(1.2);
            }

            .progress-step.active .step-dot::after {
                background: #fff;
                width: 6px;
                height: 6px;
            }

            .progress-step.completed .step-dot {
                border-color: rgba(255, 255, 255, 0.4);
                background: rgba(16, 185, 129, 0.3);
            }

            .progress-step.completed .step-dot::after {
                content: '✓';
                width: auto;
                height: auto;
                background: none;
                color: #fff;
                font-size: 8px;
                font-weight: 600;
            }

            .step-label {
                font-size: 0.65rem;
                color: rgba(255, 255, 255, 0.5);
                font-weight: 500;
                letter-spacing: 0.03em;
                text-transform: uppercase;
                transition: all 0.3s ease;
            }

            .progress-step.active .step-label {
                color: #fff;
                font-weight: 600;
                text-shadow: 0 0 10px rgba(255,255,255,0.3);
            }
            
            .progress-step.completed .step-label {
                color: rgba(255, 255, 255, 0.7);
            }

            .progress-thought {
                text-align: center;
                margin-top: 0.5rem;
                font-size: 0.7rem;
                color: rgba(255, 255, 255, 0.6);
                font-weight: 400;
                letter-spacing: 0.01em;
                font-style: italic;
            }

            .thought-text {
                transition: all 0.5s ease;
            }

            .funnel-step-container {
                padding-top: 0px;
                min-height: 100vh;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
                margin: 0;
            }

            @media (max-width: 768px) {
                .progress-container {
                    padding: 0 1.5rem;
                }

                .step-label {
                    font-size: 0.65rem;
                }

                .progress-thought {
                    font-size: 0.8rem;
                    margin-top: 1rem;
                }
            }
        `;

        // Inject styles if not already present
        if (!document.getElementById('funnelControllerStyles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'funnelControllerStyles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(progressBar);
    },

    // Get progress labels based on persona
    getProgressLabels() {
        const personaId = this.personaConfig?.id || 'default';
        
        // Simplified, elegant progress messages without emoji
        const progressMaps = {
            ceo: [
                { label: 'Hook', thought: "Let me show you what I can bring to the table" },
                { label: 'Proof', thought: "Here's how I deliver measurable growth" },
                { label: 'Connect', thought: "Let's discuss Jurni's revenue potential" }
            ],
            cto: [
                { label: 'Tech', thought: "Speaking your language - AI, automation, scale" },
                { label: 'Build', thought: "Proof I can build what others just talk about" },
                { label: 'Solve', thought: "Let's tackle Jurni's technical challenges" }
            ],
            cpo: [
                { label: 'Design', thought: "Starting with what matters - user experience" },
                { label: 'Journey', thought: "How I obsess over customer journeys" },
                { label: 'Create', thought: "Let's craft something beautiful together" }
            ],
            vp_bd: [
                { label: 'Partner', thought: "Turning customers into growth advocates" },
                { label: 'Success', thought: "Building lasting partnerships that scale" },
                { label: 'Grow', thought: "Let's scale Jurni through partnerships" }
            ],
            cos: [
                { label: 'Execute', thought: "Disciplined execution meets startup agility" },
                { label: 'Adapt', thought: "Precision under pressure, flexibility in action" },
                { label: 'Strategy', thought: "Planning Jurni's market domination" }
            ],
            mom: [
                { label: 'News', thought: "Found a company that values creativity" },
                { label: 'Perfect', thought: "Why this is my dream job" },
                { label: 'Celebrate', thought: "Finally using all my talents" }
            ],
            default: [
                { label: 'Introduction', thought: "Let me show you what I can bring to the table" },
                { label: 'Capabilities', thought: "Here's proof of what I can do" },
                { label: "Let's Connect", thought: "Ready to build something amazing together" }
            ]
        };

        return progressMaps[personaId] || progressMaps.default;
    },

    // Update progress bar
    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressSteps = document.querySelectorAll('.progress-step');
        const thoughtText = document.getElementById('progressThought');
        const progressLabels = this.getProgressLabels();
        
        if (progressFill) {
            const progress = ((this.currentStep + 1) / this.steps.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        if (thoughtText && progressLabels[this.currentStep]) {
            thoughtText.style.opacity = '0';
            setTimeout(() => {
                thoughtText.textContent = progressLabels[this.currentStep].thought;
                thoughtText.style.opacity = '1';
            }, 300);
        }

        if (progressSteps) {
            progressSteps.forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index < this.currentStep) {
                    step.classList.add('completed');
                } else if (index === this.currentStep) {
                    step.classList.add('active');
                }
            });
        }
    },

    // Show a specific step
    showStep(stepIndex) {
        this.currentStep = stepIndex;

        // Clear container
        this.container.innerHTML = '<div class="funnel-step-container"></div>';
        const stepContainer = this.container.querySelector('.funnel-step-container');

        // Load the appropriate component
        switch (this.steps[stepIndex]) {
            case 'hook':
                TheHook.init(this.personaConfig, stepContainer);
                break;
            case 'bottleneck':
                Bottleneck.init(this.personaConfig, stepContainer);
                break;
            case 'closer':
                Closer.init(this.personaConfig, stepContainer);
                break;
        }

        // Add smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Move to next step
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            console.log('🎉 Funnel completed!');
        }
    },

    // Move to previous step
    previousStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    },

    // Reset funnel
    reset() {
        this.currentStep = 0;
        this.personaConfig = null;
        this.personaData = null;
        this.klofiContent = {};
        
        // Remove funnel container
        if (this.container) {
            this.container.remove();
        }

        // Remove progress bar
// const progressBar = document.getElementById('funnelProgress');
// if (progressBar) {
//     progressBar.remove();
// }

        // Show persona selection again
        const personaSelection = document.getElementById('personaSelectionStep');
        if (personaSelection) {
            personaSelection.style.display = 'block';
        }
    },

    // Get default config as fallback
    getDefaultConfig() {
        return {
            theme: {
                primary: "#6366f1",
                secondary: "#8b5cf6",
                accent: "#ec4899",
                fontFamily: "Inter",
                animationSpeed: "medium"
            },
            hook: {
                greeting: "Hi there,",
                role: "Decision Maker",
                mainLine: "Looking for someone who can transform your business?",
                ctaText: "Let's explore",
                stats: ["7+ years experience", "Proven results", "AI-powered solutions"]
            },
            bottleneck: {
                headline: "Delivering value through innovation",
                priorities: [
                    {
                        title: "Growth",
                        icon: "🚀",
                        proof: "Scaled multiple projects from 0 to success",
                        detail: "Strategic thinking meets tactical execution"
                    },
                    {
                        title: "Technology",
                        icon: "💡",
                        proof: "Cutting-edge AI and automation",
                        detail: "Building the future, today"
                    },
                    {
                        title: "Results",
                        icon: "📈",
                        proof: "Measurable impact on every project",
                        detail: "Data-driven decisions that work"
                    }
                ],
                ctaText: "Continue"
            },
            closer: {
                headline: "Let's build something amazing together",
                subline: "Ready to take the next step?",
                meetingText: "Let's meet for",
                drinkOptions: ["coffee ☕", "tea 🍵"],
                buttonText: "Schedule meeting"
            }
        };
    }
};