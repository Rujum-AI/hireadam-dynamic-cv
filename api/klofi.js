// KLOFI AI System - The brain of the dynamic CV
const express = require('express');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Session storage (in production, you'd use a database)
const sessions = new Map();

// Load prompt templates and data
function loadPromptTemplate(filename) {
    try {
        const filePath = path.join(__dirname, '..', filename);
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`❌ Error loading prompt ${filename}:`, error);
        return null;
    }
}

function loadData(filename) {
    try {
        const filePath = path.join(__dirname, '..', 'data', filename);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`❌ Error loading data ${filename}:`, error);
        return null;
    }
}

// Check KLOFI status
router.get('/status', (req, res) => {
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
    
    res.json({
        status: hasOpenAIKey ? 'ready' : 'no_api_key',
        message: hasOpenAIKey ? 'KLOFI AI system ready' : 'OpenAI API key not configured',
        timestamp: new Date().toISOString()
    });
});

// Generate Hook content
router.post('/hook', async (req, res) => {
    try {
        const { persona } = req.body;
        
        if (!persona) {
            return res.status(400).json({ error: 'Persona is required' });
        }

        console.log(`🎣 Generating Hook for ${persona.name}`);

        // Check if OpenAI is available
        if (!process.env.OPENAI_API_KEY) {
            console.log('⚠️ No OpenAI key - using fallback content');
            return res.json(getFallbackContent('hook', persona));
        }

        // Load prompt template and CV data
        const masterPrompt = loadPromptTemplate('klofi-master.txt');
        const hookPrompt = loadPromptTemplate('klofi-hook.txt');
        const cvData = loadData('adam-cv.json');

        if (!masterPrompt || !hookPrompt || !cvData) {
            return res.status(500).json({ error: 'Failed to load prompt templates or CV data' });
        }

        // Create session
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessions.set(sessionId, {
            persona,
            ledger: {
                used_experiences: [],
                used_facts: [],
                angles_by_experience: {}
            },
            timestamp: new Date().toISOString()
        });

        // Prepare the prompt
        const fullPrompt = `${masterPrompt}

CV DATA:
${JSON.stringify(cvData, null, 2)}

PERSONA DATA:
${JSON.stringify(persona, null, 2)}

TASK:
${hookPrompt}

Generate a Hook response for persona "${persona.name}" (${persona.role}).`;

        // Call OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are KLOFI, an AI that generates personalized CV funnel content. Always respond with valid JSON matching the exact schema requested. Be creative but factual - only use information from the provided CV data."
                },
                {
                    role: "user",
                    content: fullPrompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        });

        let hookContent;
        try {
            hookContent = JSON.parse(completion.choices[0].message.content);
            hookContent.sessionId = sessionId;
        } catch (parseError) {
            console.error('❌ Failed to parse AI response:', parseError);
            return res.json(getFallbackContent('hook', persona));
        }

        console.log('✅ Hook generated successfully');
        res.json(hookContent);

    } catch (error) {
        console.error('❌ Error generating Hook:', error);
        // Fallback to static content
        res.json(getFallbackContent('hook', persona));
    }
});

// Generate Bottleneck content
router.post('/bottleneck', async (req, res) => {
    try {
        const { persona, sessionId } = req.body;
        
        if (!persona) {
            return res.status(400).json({ error: 'Persona is required' });
        }

        console.log(`🎯 Generating Bottleneck for ${persona.name}`);

        // Check if OpenAI is available
        if (!process.env.OPENAI_API_KEY) {
            console.log('⚠️ No OpenAI key - using fallback content');
            return res.json(getFallbackContent('bottleneck', persona));
        }

        // Load prompt template and CV data
        const masterPrompt = loadPromptTemplate('klofi-master.txt');
        const bottleneckPrompt = loadPromptTemplate('klofi-bottleneck.txt');
        const cvData = loadData('adam-cv.json');

        if (!masterPrompt || !bottleneckPrompt || !cvData) {
            return res.status(500).json({ error: 'Failed to load prompt templates or CV data' });
        }

        // Get session data
        const session = sessions.get(sessionId) || {
            persona,
            ledger: {
                used_experiences: [],
                used_facts: [],
                angles_by_experience: {}
            }
        };

        // Prepare the prompt
        const fullPrompt = `${masterPrompt}

CV DATA:
${JSON.stringify(cvData, null, 2)}

PERSONA DATA:
${JSON.stringify(persona, null, 2)}

SESSION LEDGER:
${JSON.stringify(session.ledger, null, 2)}

TASK:
${bottleneckPrompt}

Generate a Bottleneck response for persona "${persona.name}" (${persona.role}).`;

        // Call OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are KLOFI, an AI that generates personalized CV funnel content. Always respond with valid JSON matching the exact schema requested. Use distinct experiences for each priority block."
                },
                {
                    role: "user",
                    content: fullPrompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        let bottleneckContent;
        try {
            bottleneckContent = JSON.parse(completion.choices[0].message.content);
        } catch (parseError) {
            console.error('❌ Failed to parse AI response:', parseError);
            return res.json(getFallbackContent('bottleneck', persona));
        }

        console.log('✅ Bottleneck generated successfully');
        res.json(bottleneckContent);

    } catch (error) {
        console.error('❌ Error generating Bottleneck:', error);
        res.json(getFallbackContent('bottleneck', persona));
    }
});

// Generate Closer content
router.post('/closer', async (req, res) => {
    try {
        const { persona, sessionId } = req.body;
        
        if (!persona) {
            return res.status(400).json({ error: 'Persona is required' });
        }

        console.log(`🎯 Generating Closer for ${persona.name}`);

        // Check if OpenAI is available
        if (!process.env.OPENAI_API_KEY) {
            console.log('⚠️ No OpenAI key - using fallback content');
            return res.json(getFallbackContent('closer', persona));
        }

        // Load prompt template
        const masterPrompt = loadPromptTemplate('klofi-master.txt');
        const closerPrompt = loadPromptTemplate('klofi-closer.txt');

        if (!masterPrompt || !closerPrompt) {
            return res.status(500).json({ error: 'Failed to load prompt templates' });
        }

        // Prepare the prompt
        const fullPrompt = `${masterPrompt}

PERSONA DATA:
${JSON.stringify(persona, null, 2)}

TASK:
${closerPrompt}

Generate a Closer response for persona "${persona.name}" (${persona.role}).`;

        // Call OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are KLOFI, an AI that generates personalized CV funnel content. Always respond with valid JSON matching the exact schema requested. Must include 'Jurni' in headline."
                },
                {
                    role: "user",
                    content: fullPrompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });

        let closerContent;
        try {
            closerContent = JSON.parse(completion.choices[0].message.content);
        } catch (parseError) {
            console.error('❌ Failed to parse AI response:', parseError);
            return res.json(getFallbackContent('closer', persona));
        }

        console.log('✅ Closer generated successfully');
        res.json(closerContent);

    } catch (error) {
        console.error('❌ Error generating Closer:', error);
        res.json(getFallbackContent('closer', persona));
    }
});

// Fallback content generator
function getFallbackContent(stage, persona) {
    const fallbacks = loadData('funnel-configs.json');
    if (!fallbacks || !fallbacks[persona.id]) {
        return getBasicFallback(stage, persona);
    }
    return fallbacks[persona.id][stage];
}

function getBasicFallback(stage, persona) {
    const basic = {
        hook: {
            greeting: `Hi ${persona.name},`,
            role: persona.role,
            mainLine: "Looking for someone who can deliver exceptional results?",
            ctaText: "Learn more",
            stats: ["7+ years experience", "Proven track record", "AI-powered solutions"]
        },
        bottleneck: {
            headline: "Three ways I can help your organization",
            priorities: persona.priorities.map((priority, index) => ({
                title: priority,
                icon: ["🚀", "⚡", "🎯"][index] || "⭐",
                header: `Expertise in ${priority}`,
                info: "Delivering results that matter"
            })),
            ctaText: "Continue"
        },
        closer: {
            headline: "Ready to work together at Jurni",
            subline: "Let's discuss how I can contribute",
            meetingText: "Let's meet for",
            drinkOptions: ["coffee ☕", "Lager"],
            buttonText: "Connect"
        }
    };
    return basic[stage];
}

module.exports = router;
