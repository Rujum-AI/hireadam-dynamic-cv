// Main Application Controller
const App = {
    // Application state
    state: {
        selectedPersona: null,
        personas: []
    },

    // Initialize the application
    async init() {
        console.log('🚀 Initializing Jurni Landing Page...');
        
        try {
            await this.loadPersonas();
            this.setupEventListeners();
            
            // Initialize persona selection
            PersonaSelection.init(this.state.personas, this);
            
            console.log('✅ Application initialized successfully');
        } catch (error) {
            console.error('❌ Application initialization failed:', error);
        }
    },

    // Load personas data from JSON file
    async loadPersonas() {
        try {
            // Try to load from API first
            console.log('📡 Attempting to load personas from API...');
            const response = await fetch('/api/personas');
            if (response.ok) {
                this.state.personas = await response.json();
                console.log('📥 Personas loaded from API:', this.state.personas.length);
                return;
            }
        } catch (error) {
            console.log('⚠️ API not available, trying static file...');
        }
        
        try {
            // Try to load from static JSON file
            const response = await fetch('/data/personas.json');
            if (response.ok) {
                const data = await response.json();
                this.state.personas = data.personas;
                console.log('📥 Personas loaded from JSON file:', this.state.personas.length);
                return;
            }
        } catch (error) {
            console.error('❌ Could not load personas from JSON file:', error);
        }
        
        // If all fails, show error
        console.error('❌ No personas could be loaded!');
        this.state.personas = [];
    },

    // Set up event listeners
    setupEventListeners() {
        // Reset selection with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.resetSelection();
            }
        });
    },

    // Store selected persona
    setSelectedPersona(persona) {
        this.state.selectedPersona = persona;
        console.log('👤 Persona selected:', persona.name);
        
        // Handle persona selection
        this.handlePersonaSelection(persona);
    },

    // Handle persona selection
    handlePersonaSelection(persona) {
    console.log('🎯 Starting funnel for persona:', persona.id);
        // Start the funnel experience
        FunnelController.init(persona.id);
        // Show persona details (example: log to console)
        console.log(`Quote: "${persona.sample_quote}"
    Priorities: ${persona.priorities.join(', ')}
    This is where we'll build the personalized experience next!`);
        },

    // Reset selection
    resetSelection() {
        this.state.selectedPersona = null;
        console.log('🔄 Selection reset');
    }
};

// Contact form function (for header button)
function showContactForm() {
    const subject = 'Interest in Growth Design Services';
    const body = 'Hi Adam,\n\nI\'m interested in learning more about your growth design services.\n\nBest regards';
    window.location.href = `mailto:adam@hireadam.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}