# 🔧 Troubleshooting - Registro Dando Erro

## ❌ Problema Comum: "Erro ao criar conta"

### 🔍 Diagnóstico TDD Realizado:

✅ **Backend aceita os dados:** Status 201 (SUCESSO)
✅ **Email não existe no banco:** OK para registrar
✅ **Validações funcionando:** Todas as regras corretas
❌ **Backend não está rodando:** ESSE É O PROBLEMA!

## 🎯 Solução: Iniciar o Backend

### Opção 1: Iniciar Tudo Junto (Recomendado)

Na **raiz do projeto** (`bulletproof-react/`):

```bash
npm run dev
```

Isso inicia:
- 🟦 Backend na porta 8000
- 🟪 Frontend na porta 3003

Você verá:
```
[BACKEND] ✅ MongoDB conectado com sucesso!
[BACKEND] 🚀 Server running on http://localhost:8000
[FRONTEND] ➜  Local:   http://localhost:3003/
```

### Opção 2: Iniciar Separadamente

**Terminal 1 - Backend:**
```bash
cd apps/backend
npm run dev
```

Aguarde ver:
```
✅ MongoDB conectado com sucesso!
🚀 Server running on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd apps/react-vite
npm run dev
```

Aguarde ver:
```
➜  Local:   http://localhost:3003/
```

## ✅ Como Verificar se Está Funcionando

### 1. Teste o Backend:
```bash
curl http://localhost:8000/api/health
```

Esperado:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Teste o Frontend:
Acesse: `http://localhost:3003`

Deve carregar a landing page

### 3. Teste o Registro:

1. Acesse: `http://localhost:3003/auth/register`

2. Preencha:
   ```
   First Name: João
   Last Name: Silva
   Email: joao@exemplo.com
   Password: senha123  ← Use pelo menos 5 caracteres
   ```

3. Clique em **"Register"**

4. Se funcionar:
   - ✅ Você será redirecionado para `/dashboard`
   - ✅ Verá a tela de avaliação de refeições

## 🚨 Outros Problemas Possíveis

### Problema 1: Senha muito curta

❌ **Erro:** "Senha deve ter no mínimo 5 caracteres"

**Solução:** Use senha com 5+ caracteres
```
✅ senha123  (8 caracteres)
✅ 12345     (5 caracteres)
❌ 1234      (4 caracteres - muito curta!)
```

### Problema 2: Email já existe

❌ **Popup:** "Email já cadastrado. Faça login ou use outro email."

**Solução 1:** Faça login com esse email
```bash
1. Clique em "Log In"
2. Use o email e senha cadastrados
```

**Solução 2:** Use outro email
```bash
joao2@exemplo.com
joao.silva@exemplo.com
```

**Solução 3:** Delete o usuário do banco
```bash
cd apps/backend
npm run view-data
```

### Problema 3: Portas em uso

❌ **Erro:** "Port 8000 is already in use"

**Solução:**
```bash
# Matar processos na porta 8000
lsof -ti:8000 | xargs kill -9

# Ou usar outra porta
PORT=8001 npm run dev
```

### Problema 4: MongoDB não conecta

❌ **Erro:** "Failed to connect to MongoDB"

**Verificar:**
1. Arquivo `.env` existe em `apps/backend/`?
2. `MONGODB_URI` está correto?
3. IP liberado no MongoDB Atlas?

**Solução:**
```bash
cd apps/backend
cat .env

# Deve ter:
MONGODB_URI=mongodb+srv://admin:r6nRai25F7s9cJQ@...
```

### Problema 5: Dependências faltando

❌ **Erro:** "Cannot find module..."

**Solução:**
```bash
cd apps/backend
npm install

cd ../react-vite
npm install
```

## 📋 Checklist Completo

Antes de registrar, verifique:

- [ ] Backend rodando em `http://localhost:8000`
- [ ] Frontend rodando em `http://localhost:3003`
- [ ] MongoDB conectado (veja logs do backend)
- [ ] Senha com 5+ caracteres
- [ ] Email válido
- [ ] Email não cadastrado antes

## 🧪 Teste Manual Rápido

```bash
# 1. Backend funcionando?
curl http://localhost:8000/api/health

# 2. Registrar via API
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "João",
    "lastName": "Silva",
    "email": "teste-manual@exemplo.com",
    "password": "senha123"
  }'

# Esperado: Status 201 + dados do usuário
```

## 🎯 Fluxo Correto

```
1. ✅ Backend rodando
   → http://localhost:8000

2. ✅ Frontend rodando
   → http://localhost:3003

3. ✅ MongoDB conectado
   → Veja logs: "MongoDB conectado com sucesso!"

4. ✅ Acesse registro
   → http://localhost:3003/auth/register

5. ✅ Preencha formulário
   → Nome, Sobrenome, Email, Senha (5+ chars)

6. ✅ Clique "Register"

7. ✅ Sucesso!
   → Redirecionado para /dashboard
```

## 📞 Comandos Úteis

```bash
# Ver usuários no banco
npm run view-data

# Criar usuário de teste
npm run create-test-user

# Rodar testes
npm test

# Verificar backend
curl http://localhost:8000/api/health

# Matar processos
pkill -f nodemon
pkill -f vite
```

## 🔍 Debug Avançado

Se ainda não funcionar:

```bash
# 1. Ver logs em tempo real
cd apps/backend
npm run dev

# Em outro terminal
cd apps/react-vite  
npm run dev

# 2. Abra DevTools no navegador (F12)
# 3. Aba "Network"
# 4. Tente registrar
# 5. Veja a requisição POST para /api/auth/register
# 6. Verifique status e resposta
```

## ✅ Exemplo Funcionando

```bash
# Terminal 1
cd apps/backend
npm run dev

# Saída:
✅ MongoDB conectado com sucesso!
🚀 Server running on http://localhost:8000

# Terminal 2
cd apps/react-vite
npm run dev

# Saída:
➜  Local:   http://localhost:3003/

# Navegador
http://localhost:3003/auth/register

# Formulário:
First Name: João
Last Name: Silva
Email: joao@exemplo.com
Password: senha123

# Resultado:
✅ Redirecionado para /dashboard
✅ Usuário logado!
```

