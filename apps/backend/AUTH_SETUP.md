# 🔐 Sistema de Autenticação - Guia de Configuração

Sistema de autenticação simples com sessões integrado ao MongoDB Atlas.

## ✅ O Que Foi Implementado

### Backend
- ✅ Modelo de User com hash de senha (bcrypt)
- ✅ Rotas de autenticação:
  - `POST /api/auth/register` - Criar conta
  - `POST /api/auth/login` - Fazer login
  - `POST /api/auth/logout` - Fazer logout
  - `GET /api/auth/me` - Obter usuário atual
- ✅ Sessões com express-session
- ✅ Meal evaluations vinculadas ao userId

### Frontend
- ✅ Telas de login e registro
- ✅ Proteção de rotas (ProtectedRoute)
- ✅ MSW desabilitado (usando backend real)
- ✅ Redirecionamento após login para /dashboard

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` em `apps/backend/`:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/meal-evaluations
SESSION_SECRET=sua-chave-secreta-aqui-mude-isso
```

> **Importante:** Use uma string aleatória e segura para `SESSION_SECRET` em produção.

### 2. Iniciar o Backend

```bash
cd apps/backend
npm run dev
```

O servidor iniciará em `http://localhost:8000`

### 3. Iniciar o Frontend

```bash
cd apps/react-vite
npm run dev
```

O frontend iniciará em `http://localhost:5173`

## 🔄 Fluxo de Autenticação

1. **Visitante acessa** → `/` (landing page pública)
2. **Clica em "Entrar"** → `/auth/login`
3. **Faz login** → Backend cria sessão
4. **Redirecionado** → `/dashboard` (protegido)
5. **Avalia refeições** → Dados salvos no MongoDB vinculados ao seu userId

## 📝 Testando a Autenticação

### Criar uma Conta

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123",
    "firstName": "João",
    "lastName": "Silva"
  }'
```

### Fazer Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123"
  }'
```

### Verificar Usuário

```bash
curl -X GET http://localhost:8000/api/auth/me \
  -b cookies.txt
```

## 🗄️ Estrutura dos Dados

### User (MongoDB)
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  createdAt: Date
}
```

### MealEvaluation (MongoDB)
```javascript
{
  _id: ObjectId,
  userId: String,  // ← Vinculado ao usuário
  mealId: String,
  nutrition: Number (1-5),
  satisfaction: Number (1-5),
  createdAt: Date
}
```

## 🔒 Segurança

- ✅ Senhas com hash bcrypt (salt rounds: 10)
- ✅ Sessões HTTP-only
- ✅ CORS configurado
- ✅ Validação de dados
- ✅ Dados separados por usuário

## 🐛 Troubleshooting

### Erro: "Não autenticado"
- Verifique se o backend está rodando
- Confirme que as cookies estão sendo enviadas (withCredentials: true)
- Limpe os cookies do navegador

### Erro: "Usuário já existe"
- O email já foi cadastrado
- Use outro email ou faça login

### Erro de conexão MongoDB
- Verifique a MONGODB_URI no .env
- Confirme que o IP está liberado no MongoDB Atlas
- Verifique usuário e senha do banco

## 📊 Próximos Passos

Para produção, considere adicionar:
- [ ] Tokens JWT (mais escalável)
- [ ] Refresh tokens
- [ ] Verificação de email
- [ ] Recuperação de senha
- [ ] Rate limiting
- [ ] HTTPS obrigatório

