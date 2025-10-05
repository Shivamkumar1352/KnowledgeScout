const express = require('express');
const Document = require('../models/Document');
const { askQuestion } = require('../utils/openrouterClient');

const router = express.Router();

router.post('/', async (req, res) => {
    const { docId, question } = req.body;
    try {
        const doc = await Document.findById(docId);
        if (!doc) return res.status(404).json({ error: 'Document not found' });

        // Call OpenRouter only when question is asked
        const answer = await askQuestion(doc.text, question);
        res.json({ answer });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to get answer. Check OpenRouter API key.' });
    }
});

module.exports = router;
