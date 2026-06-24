const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors()); // Cho phép Neko AI từ web gửi yêu cầu tới
app.use(express.json()); // Đọc dữ liệu dạng JSON

app.post('/chat', async (req, res) => {
    try {
        // Gửi yêu cầu sang Groq
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', req.body, {
            headers: { 
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Vercel cần cái này để chạy
module.exports = app;
