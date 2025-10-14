import request from 'supertest';
import express from 'express';
import session from 'express-session';
import { User } from '../models/user.model';
import authRoutes from '../routes/auth.routes';

const app = express();
app.use(express.json());
app.use(
  session({
    secret: 'test-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use('/api/auth', authRoutes);

describe('Autenticação - TDD', () => {
  describe('POST /api/auth/register', () => {
    it('deve criar um novo usuário no MongoDB', async () => {
      const userData = {
        email: 'teste@exemplo.com',
        password: 'senha123',
        firstName: 'João',
        lastName: 'Silva',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.firstName).toBe(userData.firstName);
      expect(response.body.user.lastName).toBe(userData.lastName);

      const userInDb = await User.findOne({ email: userData.email });
      expect(userInDb).toBeTruthy();
      expect(userInDb?.email).toBe(userData.email);
    });

    it('não deve permitir registrar usuário com email duplicado', async () => {
      const userData = {
        email: 'duplicado@exemplo.com',
        password: 'senha123',
        firstName: 'João',
        lastName: 'Silva',
      };

      await request(app).post('/api/auth/register').send(userData);

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.message).toBe('Email já cadastrado. Faça login ou use outro email.');
    });

    it('deve fazer hash da senha antes de salvar', async () => {
      const userData = {
        email: 'senha@exemplo.com',
        password: 'senha123',
        firstName: 'João',
        lastName: 'Silva',
      };

      await request(app).post('/api/auth/register').send(userData);

      const userInDb = await User.findOne({ email: userData.email });
      expect(userInDb?.password).not.toBe(userData.password);
      expect(userInDb?.password.length).toBeGreaterThan(20);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const userData = {
        email: 'teste@exemplo.com',
        password: 'senha123',
        firstName: 'João',
        lastName: 'Silva',
      };
      await request(app).post('/api/auth/register').send(userData);
    });

    it('deve fazer login com credenciais corretas', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'teste@exemplo.com',
          password: 'senha123',
        })
        .expect(200);

      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe('teste@exemplo.com');
    });

    it('deve retornar erro com email inexistente', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'naoexiste@exemplo.com',
          password: 'senha123',
        })
        .expect(401);

      expect(response.body.message).toBe('Usuário não cadastrado no sistema');
    });

    it('deve retornar erro com senha incorreta', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'teste@exemplo.com',
          password: 'senhaerrada',
        })
        .expect(401);

      expect(response.body.message).toBe('Senha incorreta');
    });

    it('deve criar sessão após login bem-sucedido', async () => {
      const agent = request.agent(app);

      await agent.post('/api/auth/login').send({
        email: 'teste@exemplo.com',
        password: 'senha123',
      });

      const response = await agent.get('/api/auth/me').expect(200);

      expect(response.body.data.email).toBe('teste@exemplo.com');
    });
  });

  describe('GET /api/auth/me', () => {
    it('deve retornar dados do usuário logado', async () => {
      const agent = request.agent(app);

      await agent.post('/api/auth/register').send({
        email: 'logado@exemplo.com',
        password: 'senha123',
        firstName: 'Maria',
        lastName: 'Santos',
      });

      const response = await agent.get('/api/auth/me').expect(200);

      expect(response.body.data.email).toBe('logado@exemplo.com');
      expect(response.body.data.firstName).toBe('Maria');
      expect(response.body.data.lastName).toBe('Santos');
    });

    it('deve retornar erro se não estiver autenticado', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.message).toBe('Não autenticado');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('deve fazer logout e destruir a sessão', async () => {
      const agent = request.agent(app);

      await agent.post('/api/auth/register').send({
        email: 'logout@exemplo.com',
        password: 'senha123',
        firstName: 'Pedro',
        lastName: 'Costa',
      });

      await agent.post('/api/auth/logout').expect(200);

      await agent.get('/api/auth/me').expect(401);
    });
  });

  describe('Verificação de Usuário no MongoDB', () => {
    it('deve verificar se usuário existe no banco após registro', async () => {
      const email = 'verificar@exemplo.com';

      const usuarioAntes = await User.findOne({ email });
      expect(usuarioAntes).toBeNull();

      await request(app).post('/api/auth/register').send({
        email,
        password: 'senha123',
        firstName: 'Ana',
        lastName: 'Oliveira',
      });

      const usuarioDepois = await User.findOne({ email });
      expect(usuarioDepois).not.toBeNull();
      expect(usuarioDepois?.email).toBe(email);
      expect(usuarioDepois?.firstName).toBe('Ana');
      expect(usuarioDepois?.lastName).toBe('Oliveira');
    });

    it('deve contar usuários no banco de dados', async () => {
      const countInicial = await User.countDocuments();
      expect(countInicial).toBe(0);

      await request(app).post('/api/auth/register').send({
        email: 'usuario1@exemplo.com',
        password: 'senha123',
        firstName: 'Usuário',
        lastName: 'Um',
      });

      await request(app).post('/api/auth/register').send({
        email: 'usuario2@exemplo.com',
        password: 'senha123',
        firstName: 'Usuário',
        lastName: 'Dois',
      });

      const countFinal = await User.countDocuments();
      expect(countFinal).toBe(2);
    });

    it('deve buscar usuário por email', async () => {
      const email = 'buscar@exemplo.com';

      await request(app).post('/api/auth/register').send({
        email,
        password: 'senha123',
        firstName: 'Buscar',
        lastName: 'Teste',
      });

      const usuario = await User.findOne({ email });
      expect(usuario).toBeTruthy();
      expect(usuario?.email).toBe(email);
      expect(usuario?.firstName).toBe('Buscar');
    });
  });
});

