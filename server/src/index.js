import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'MicroMind Base Template Server',
        version: '1.0.0',
        phase: 'Phase 1 Complete'
    });
});

// Placeholder route
app.get('/api', (req, res) => {
    res.json({
        message: 'Base Template API - Ready for Phase 2',
        endpoints: {
            health: 'GET /api/health',
            auth: 'POST /api/auth/* (Phase 2)',
            users: 'GET /api/users/* (Phase 2)'
        }
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Phase 1: Foundation Setup Complete`);
    console.log(`🔄 Ready for Phase 2: Authentication & Navigation`);
});
