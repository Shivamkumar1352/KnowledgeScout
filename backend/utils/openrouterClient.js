const axios = require('axios');
require('dotenv').config();

const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

async function askQuestion(context, question) {
    try {
        const response = await axios.post(apiUrl, {
            model: 'openai/gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a helpful assistant for document Q&A.' },
                { role: 'user', content: `Context: ${context}\nQuestion: ${question}` },
            ],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
    if (error.response) {
        console.error('OpenRouter response error:', error.response.status, error.response.data);
    } else {
        console.error('OpenRouter request error:', error.message);
    }
    throw new Error('Failed to get response from OpenRouter');
}

}

module.exports = { askQuestion };
