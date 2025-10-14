# 🚀 Guia de Deploy - Railway + Vercel

Este guia mostra como fazer deploy completo do sistema usando:
- **Frontend**: Vercel (grátis)
- **Backend**: Railway (grátis até $5/mês)
- **Banco**: MongoDB Atlas (grátis)

---

## 📋 PRÉ-REQUISITOS

Antes de começar, tenha em mãos:

✅ Conta no GitHub (para conectar ao Vercel e Railway)
✅ MongoDB Atlas configurado e funcionando
✅ Connection string do MongoDB Atlas
✅ Código commitado no Git

---

## 🗄️ PARTE 1: MONGODB ATLAS (Banco de Dados)

### 1. Verificar se MongoDB Atlas está configurado

Acesse: https://cloud.mongodb.com

1. Vá em **Database** → Seu cluster
2. Clique em **Connect** → **Connect your application**
3. Copie a connection string:
   ```
   mongodb+srv://usuario:senha@cluster.mongodb.net/meal-evaluations?retryWrites=true&w=majority
   ```

### 2. Configurar acesso em produção

1. **Network Access** → **Add IP Address**
2. Clique em **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Confirme

⚠️ **Importante**: Isso permite que Railway acesse seu banco.

---

## 🔧 PARTE 2: BACKEND NO RAILWAY

### 1. Criar conta no Railway

1. Acesse: https://railway.app
2. Clique em **"Login with GitHub"**
3. Autorize o Railway

### 2. Criar novo projeto

1. Clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione seu repositório: `bulletproof-react`
4. Clique em **"Add variables"** para configurar depois

### 3. Configurar variáveis de ambiente

No Railway, vá em **Variables** e adicione:

```
PORT=8000
NODE_ENV=production
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meal-evaluations?retryWrites=true&w=majority
SESSION_SECRET=gere-uma-string-aleatoria-segura-aqui
FRONTEND_URL=https://seu-app.vercel.app
```

> **Dica**: Para gerar `SESSION_SECRET`, use:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 4. Configurar root directory

1. No Railway, vá em **Settings**
2. Em **Root Directory**, coloque: `apps/backend`
3. Em **Start Command**, coloque: `node dist/server.js`
4. Salve

### 5. Gerar domínio público

1. Vá em **Settings**
2. Clique em **Generate Domain**
3. Copie a URL (algo como: `https://seu-backend.up.railway.app`)

### 6. Deploy

Railway vai fazer deploy automaticamente. Acompanhe em **Deployments**.

✅ **Sucesso quando ver**: "MongoDB conectado" nos logs

---

## 🎨 PARTE 3: FRONTEND NO VERCEL

### 1. Criar conta no Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel

### 2. Importar projeto

1. No dashboard, clique em **"Add New..."** → **"Project"**
2. Selecione seu repositório: `bulletproof-react`
3. Clique em **"Import"**

### 3. Configurar projeto

1. **Framework Preset**: Vite
2. **Root Directory**: `apps/react-vite`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 4. Configurar variáveis de ambiente

Em **Environment Variables**, adicione:

```
VITE_APP_API_URL=https://seu-backend.up.railway.app/api
VITE_APP_ENABLE_API_MOCKING=false
```

⚠️ **Importante**: Use a URL do Railway que você copiou no passo anterior!

### 5. Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (1-2 minutos)
3. Vercel vai gerar uma URL: `https://seu-app.vercel.app`

---

## 🔄 PARTE 4: CONECTAR FRONTEND ↔ BACKEND

### 1. Atualizar CORS no Railway

1. Volte no **Railway** → **Variables**
2. Atualize `FRONTEND_URL` com a URL do Vercel:
   ```
   FRONTEND_URL=https://seu-app.vercel.app
   ```
3. Railway vai fazer redeploy automaticamente

### 2. Testar a conexão

1. Acesse sua URL do Vercel: `https://seu-app.vercel.app`
2. Vá em `/auth/register`
3. Crie uma conta
4. Faça login
5. Avalie uma refeição

✅ **Se funcionar**: Tudo certo!
❌ **Se der erro CORS**: Verifique se `FRONTEND_URL` está correto no Railway

---

## 📊 VERIFICAR SE ESTÁ FUNCIONANDO

### Backend (Railway)

Acesse: `https://seu-backend.up.railway.app/api/health`

Deve retornar:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Frontend (Vercel)

Acesse: `https://seu-app.vercel.app`

Deve carregar a landing page normalmente.

---

## 🐛 TROUBLESHOOTING

### Erro: "Cannot connect to MongoDB"

✅ Verifique se `MONGODB_URI` está correto no Railway
✅ Verifique se IP 0.0.0.0/0 está liberado no MongoDB Atlas

### Erro: "CORS policy"

✅ Verifique se `FRONTEND_URL` no Railway está igual à URL do Vercel
✅ Certifique-se que não tem `/` no final da URL

### Erro: "Build failed" no Vercel

✅ Verifique se `Root Directory` está: `apps/react-vite`
✅ Verifique se `Build Command` está: `npm run build`

### Erro: "Session not working"

✅ Verifique se `SESSION_SECRET` está configurado no Railway
✅ Certifique-se que `NODE_ENV=production` está no Railway

---

## 💰 CUSTOS

- **MongoDB Atlas**: R$ 0 (512MB grátis)
- **Railway**: R$ 0-25/mês (R$ 5 de crédito grátis)
- **Vercel**: R$ 0 (plano gratuito)

**Total**: **R$ 0-25/mês**

---

## 🔄 UPDATES FUTUROS

### Para atualizar o código:

1. Faça commit das mudanças:
   ```bash
   git add .
   git commit -m "feat: nova funcionalidade"
   git push
   ```

2. Railway e Vercel vão fazer **auto-deploy** automaticamente!

---

## 📝 CHECKLIST FINAL

Antes de liberar para usuários:

- [ ] MongoDB Atlas configurado
- [ ] Backend no Railway funcionando
- [ ] Frontend no Vercel funcionando
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente corretas
- [ ] Testado: criar conta → login → avaliar refeição
- [ ] URLs anotadas:
  - Frontend: `https://_____.vercel.app`
  - Backend: `https://_____.railway.app`
  - MongoDB: `mongodb+srv://...`

---

## 🎉 PRONTO!

Seu app está online e pronto para uso! 🚀

**Próximos passos:**
1. Compartilhe a URL do Vercel com seus clientes
2. Crie usuários de teste
3. Monitore logs no Railway e Vercel
4. Configure domínio personalizado (opcional)

**Dúvidas?** Verifique os logs:
- Railway: Dashboard → Deployments → View Logs
- Vercel: Dashboard → Deployments → Function Logs

