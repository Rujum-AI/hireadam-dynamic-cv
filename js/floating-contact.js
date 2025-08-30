// Floating Contact Component - Universal
const FloatingContact = {
    // Initialize the floating contact on any page
    init() {
        this.injectCSS();
        this.injectHTML();
        this.bindEvents();
        console.log('✅ Floating Contact component loaded');
    },

    // Inject the CSS styles
    injectCSS() {
        const css = `
        /* Floating Contact Component - PROMINENT VERSION */
        .floating-contact {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 9999;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .floating-contact-trigger {
            position: relative;
            width: 160px;
            height: 64px;
            background: #6366f1;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border: none;
            user-select: none;
            transform: translateY(20px);
            opacity: 0;
            overflow: hidden;
        }

        .floating-contact-trigger.loaded {
            transform: translateY(0);
            opacity: 1;
        }

        .floating-contact-trigger:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
            background: #8b5cf6;
        }

        .contact-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 2;
            position: relative;
        }

        .contact-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-text {
            color: #ffffff;
            font-weight: 600;
            font-size: 1rem;
            letter-spacing: -0.01em;
        }

        .floating-contact-trigger:hover .contact-icon {
            transform: scale(1.1);
        }

        .floating-contact-trigger:hover .contact-text {
            transform: translateX(2px);
        }

        /* Enhanced pulsing animation */
        .contact-pulse {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 32px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            opacity: 0;
            animation: contactPulse 4s ease-in-out infinite;
        }

        @keyframes contactPulse {
            0% {
                transform: scale(1);
                opacity: 0.4;
            }
            50% {
                transform: scale(1.15);
                opacity: 0.15;
            }
            100% {
                transform: scale(1.3);
                opacity: 0;
            }
        }

        /* Contact Panel - Updated */
        .floating-contact-panel {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 320px;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border: 1px solid #e5e7eb;
            opacity: 0;
            visibility: hidden;
            transform: translateY(15px) scale(0.95);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(20px);
            overflow: hidden;
        }

        .floating-contact.active .floating-contact-panel {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }

        .contact-header {
            padding: 2rem 1.5rem 1rem;
            text-align: center;
            background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
            border-bottom: 1px solid #e5e7eb;
        }

        .contact-header h3 {
            font-size: 1.375rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .contact-header p {
            font-size: 0.95rem;
            color: #4b5563;
            margin: 0;
        }

        .contact-options {
            padding: 1rem;
        }

        .contact-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem 1rem;
            border-radius: 16px;
            text-decoration: none;
            color: #374151;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin-bottom: 0.5rem;
            background: transparent;
            border: 2px solid transparent;
        }

        .contact-option:last-child {
            margin-bottom: 0;
        }

        .contact-option:hover {
            background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
            border-color: #6366f1;
            transform: translateX(6px);
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }

        .contact-option i {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #6366f1;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: #f3f4f6;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .contact-option:hover i {
            color: #ffffff;
            background: #6366f1;
            transform: scale(1.1);
        }

        .contact-option div {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .option-title {
            font-weight: 600;
            font-size: 1rem;
            color: #111827;
        }

        .option-desc {
            font-size: 0.875rem;
            color: #6b7280;
        }

        /* Floating contact panel arrow */
        .floating-contact-panel::after {
            content: '';
            position: absolute;
            bottom: -10px;
            right: 32px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #ffffff;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .floating-contact {
                bottom: 1.5rem;
                right: 1.5rem;
            }
            
            .floating-contact-trigger {
                width: 140px;
                height: 56px;
                border-radius: 28px;
            }
            
            .contact-text {
                font-size: 0.9rem;
            }
            
            .floating-contact-panel {
                width: 300px;
                bottom: 70px;
                right: -20px;
            }
        }

        @media (max-width: 480px) {
            .floating-contact {
                bottom: 1rem;
                right: 1rem;
            }
            
            .floating-contact-trigger {
                width: 120px;
                height: 48px;
                border-radius: 24px;
            }
            
            .contact-text {
                font-size: 0.85rem;
            }
            
            .contact-icon {
                width: 16px;
                height: 16px;
                font-size: 14px;
            }
            
            .floating-contact-panel {
                width: calc(100vw - 2rem);
                right: calc(-100vw + 140px);
                bottom: 60px;
            }
        }
        `;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    },

    // Inject the HTML structure
    injectHTML() {
        const html = `
        <div class="floating-contact" id="floatingContact">
            <div class="floating-contact-trigger" id="contactTrigger">
                <div class="contact-content">
                    <div class="contact-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <span class="contact-text">Contact Me</span>
                </div>
                <div class="contact-pulse"></div>
            </div>
            
            <div class="floating-contact-panel" id="contactPanel">
                <div class="contact-header">
                    <h3>Let's Work Together</h3>
                    <p>Ready to boost your growth? Let's chat!</p>
                </div>
                <div class="contact-options">
                    <a href="mailto:friadaman@gmail.com?subject=Interest in Growth Design Services&body=Hi Adam,%0A%0AI'm interested in learning more about your growth design services.%0A%0ABest regards" class="contact-option">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <span class="option-title">Email Me</span>
                            <span class="option-desc">friadaman@gmail.com</span>
                        </div>
                    </a>
                    <a href="https://wa.me/6581580570" target="_blank" class="contact-option">
                        <i class="fab fa-whatsapp"></i>
                        <div>
                            <span class="option-title">WhatsApp</span>
                            <span class="option-desc">Quick chat, faster response</span>
                        </div>
                    </a>
                    <a href="https://linkedin.com/in/adam-fridman" target="_blank" class="contact-option">
                        <i class="fab fa-linkedin"></i>
                        <div>
                            <span class="option-title">LinkedIn</span>
                            <span class="option-desc">Let's connect professionally</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        `;

        // Insert at the end of body
        document.body.insertAdjacentHTML('beforeend', html);
    },

    // Bind all the event handlers
    bindEvents() {
        const floatingContact = document.getElementById('floatingContact');
        const contactTrigger = document.getElementById('contactTrigger');
        const contactPanel = document.getElementById('contactPanel');
        
        if (!floatingContact || !contactTrigger || !contactPanel) {
            console.error('❌ Floating contact elements not found');
            return;
        }

        // Toggle contact panel
        contactTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            floatingContact.classList.toggle('active');
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingContact.contains(e.target)) {
                floatingContact.classList.remove('active');
            }
        });
        
        // Prevent panel from closing when clicking inside it
        contactPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Add entrance animation after a delay
        setTimeout(() => {
            contactTrigger.classList.add('loaded');
        }, 1000);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        FloatingContact.init();
    });
} else {
    FloatingContact.init();
}