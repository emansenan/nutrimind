const express = require('express');
const router = express.Router();

/**
 * AI Chat Routes - Proxies to MicroMind Core AI Backend
 * 
 * Configuration via environment variables:
 *   AI_API_URL - MicroMind Core API endpoint
 *   AI_API_KEY - Bearer token for authentication
 *   AI_CHATFLOW_ID - Default AI Agent ID
 */

const AI_API_URL = process.env.AI_API_URL || 'https://dev.aimicromind.com';
const AI_API_KEY = process.env.AI_API_KEY;
const DEFAULT_CHATFLOW_ID = process.env.AI_CHATFLOW_ID;

// POST /api/v1/ai/chat/:chatflowId - Proxy chat to MicroMind AI
router.post('/chat/:chatflowId', async (req, res) => {
    const { question, chatflowId: bodyChatflowId, chatId } = req.body;
    const chatflowId = bodyChatflowId || req.params.chatflowId || DEFAULT_CHATFLOW_ID;

    // Use default chatflow if none provided or if placeholder path used
    const targetChatflowId = (!chatflowId || chatflowId === 'micromind' || chatflowId === 'e2b' || chatflowId === 'null')
        ? DEFAULT_CHATFLOW_ID
        : chatflowId;

    const targetUrl = `${AI_API_URL}/api/v1/prediction/${targetChatflowId}`;

    console.log(`🤖 AI Proxy: ${targetUrl}`);
    console.log(`   Question: ${question?.substring(0, 100)}...`);

    try {
        const payload = { question };
        if (chatId) payload.chatId = chatId;

        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ AI API error ${response.status}:`, errorText);
            return res.status(response.status).json({
                error: `AI service returned ${response.status}`,
                message: errorText
            });
        }

        const data = await response.json();
        console.log(`✅ AI response received (${data.text?.length || 0} chars)`);
        res.json(data);
    } catch (error) {
        console.error('❌ AI proxy error:', error.message);
        res.status(502).json({
            error: 'AI service unavailable',
            message: 'Could not connect to MicroMind AI backend. Please try again later.'
        });
    }
});

// GET /api/v1/ai/chatflows - List available chatflows
router.get('/chatflows', (req, res) => {
    res.json([
        { id: DEFAULT_CHATFLOW_ID, name: 'Co-Pilot Assistant' }
    ]);
});

// GET /api/v1/ai/sessions - List chat sessions
router.get('/sessions', (req, res) => {
    res.json([]);
});

module.exports = router;
