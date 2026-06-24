const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Cấu hình CORS chặt chẽ hơn để tránh lỗi kết nối
app.use(cors({
    origin: '*',
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '5mb' })); // Tăng giới hạn dung lượng nếu bồ gửi ảnh base64

app.post('/chat', async (req, res) => {
    try {
        // Gọi API Groq với timeout 25 giây
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', req.body, {
            headers: { 
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 25000 // Chờ tối đa 25s trước khi ngắt để tránh lỗi 503 treo máy
        });
        
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Lỗi Backend:', error.message);
        res.status(502).json({ 
            error: "Neko không thể kết nối tới máy chủ xử lý.",
            details: error.message 
        });
    }
});

module.exports = app;
