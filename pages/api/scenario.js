// pages/api/scenario.js
// ============================================================
// Smart Scenario Chatbot API
// Uses ScenarioEngine for intelligent conversation handling
// ============================================================

import { ScenarioEngine } from '../../lib/scenarioEngine';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { scenarioId, message, history = [], userLevel = 'beginner' } = req.body;

        if (!scenarioId || !message) {
            return res.status(400).json({ error: 'Missing required data' });
        }

        const engine = new ScenarioEngine(scenarioId, history, userLevel);
        const response = engine.analyzeAndRespond(message);

        return res.status(200).json({
            message: response.text,
            feedback: response.feedback,
            score: response.score,
            suggestions: response.suggestions,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Scenario API Error:', error);
        return res.status(500).json({ 
            error: 'Server error',
            message: 'عذراً، حدث خطأ. حاول مرة أخرى.'
        });
    }
}
