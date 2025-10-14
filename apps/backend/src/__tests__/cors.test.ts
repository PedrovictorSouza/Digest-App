import request from 'supertest';
import express from 'express';
import cors from 'cors';

const createTestApp = () => {
  const app = express();
  
  app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001', 
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:5173'
      ];
      if (!origin || allowedOrigins.some(allowed => origin.startsWith('http://localhost'))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  
  app.get('/test', (req, res) => {
    res.json({ message: 'OK' });
  });
  
  return app;
};

describe('Teste de CORS', () => {
  const app = createTestApp();
  
  it('deve aceitar requisições da porta 3000', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3000')
      .expect(200);
    
    expect(response.headers['access-control-allow-origin']).toBeTruthy();
  });
  
  it('deve aceitar requisições da porta 3001', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3001')
      .expect(200);
    
    expect(response.headers['access-control-allow-origin']).toBeTruthy();
  });
  
  it('deve aceitar requisições da porta 3002', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3002')
      .expect(200);
    
    expect(response.headers['access-control-allow-origin']).toBeTruthy();
  });
  
  it('deve aceitar requisições da porta 3003', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3003')
      .expect(200);
    
    expect(response.headers['access-control-allow-origin']).toBeTruthy();
  });
  
  it('deve aceitar requisições da porta 5173', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:5173')
      .expect(200);
    
    expect(response.headers['access-control-allow-origin']).toBeTruthy();
  });
  
  it('deve incluir credentials: true', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:3000')
      .expect(200);
    
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });
});

