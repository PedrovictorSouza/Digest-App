import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import mealEvaluationsRoutes from './routes/meal-evaluations';
import authRoutes from './routes/auth.routes';
import { connectDatabase } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.RAILWAY_PORT || 8000;

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:5173',
      process.env.FRONTEND_URL || 'https://seu-app.vercel.app'
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.some(allowed => 
      origin.startsWith('http://localhost') || origin === allowed
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'lax'
    }
  })
);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/meal-evaluations', mealEvaluationsRoutes);

const startServer = async () => {
  try {
    console.log('🔧 Starting server...');
    console.log('📋 Environment variables:');
    console.log(`  - PORT: ${process.env.PORT}`);
    console.log(`  - RAILWAY_PORT: ${process.env.RAILWAY_PORT}`);
    console.log(`  - FINAL_PORT: ${PORT}`);
    console.log(`  - NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`  - MONGODB_URI: ${process.env.MONGODB_URI ? 'SET' : 'NOT SET'}`);
    console.log(`  - SESSION_SECRET: ${process.env.SESSION_SECRET ? 'SET' : 'NOT SET'}`);
    console.log(`  - FRONTEND_URL: ${process.env.FRONTEND_URL}`);
    
    console.log('🔌 Connecting to database...');
    await connectDatabase();
    
    console.log('🌐 Starting Express server...');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();

