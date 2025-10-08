# 🚀 Guia de Deploy - Colocando na Internet

## 📋 Visão Geral

Para ter seu app funcionando na internet, você precisa de 3 coisas:

1. **MongoDB na nuvem** - Para armazenar os dados
2. **Backend na nuvem** - API rodando 24/7
3. **Frontend na nuvem** - Interface do usuário

## 1️⃣ MongoDB Atlas (Banco de Dados na Nuvem)

### Por que?
- ✅ Grátis (512MB)
- ✅ Backup automático
- ✅ Disponível 24/7
- ✅ Acessível de qualquer lugar

### Passo a Passo:

**A) Criar conta:**
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta (use Google/GitHub para facilitar)

**B) Criar cluster grátis:**
1. Clique em "Build a Database"
2. Escolha **M0 (Free)** 
3. Região: **AWS - São Paulo** (ou mais próximo de você)
4. Nome do cluster: `meal-evaluations-cluster`

**C) Configurar acesso:**   
1. **Database Access** → Add New Database User
   - Username: `admin`
   - Password: `SuaSenhaForte123` (anote essa senha!)
   - Built-in Role: **Atlas Admin**

2. **Network Access** → Add IP Address
   - Clique em "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ Em produção real, restrinja aos IPs do seu servidor

**D) Obter Connection String:**
1. Clique em "Connect" no seu cluster
2. Escolha "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copie a string (algo como):
   ```
   mongodb+srv://admin:<password>@meal-evaluations.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Substitua `<password>` pela sua senha
6. Adicione o nome do banco no final:
   ```
   mongodb+srv://admin:SuaSenhaForte123@meal-evaluations.xxxxx.mongodb.net/meal-evaluations?retryWrites=true&w=majority
   ```

**E) Testar localmente:**
```bash
# No arquivo .env do backend
MONGODB_URI=mongodb+srv://admin:SuaSenhaForte123@meal-evaluations.xxxxx.mongodb.net/meal-evaluations?retryWrites=true&w=majority

# Reinicie o servidor
npm run dev

# Teste
curl http://localhost:8000/api/health
```

---

## 2️⃣ Backend na Nuvem (API)

Vou mostrar 3 opções (escolha uma):

### Opção A: Railway (Recomendado - Mais Fácil)

**Por que Railway?**
- ✅ Deploy automático do GitHub
- ✅ Grátis ($5/mês de crédito)
- ✅ Variáveis de ambiente simples
- ✅ Logs em tempo real

**Passo a Passo:**

1. **Preparar o código:**
```bash
cd apps/backend

# Criar .gitignore (se não existir)
cat > .gitignore << EOF
node_modules/
.env
dist/
*.log
EOF

# Adicionar ao git
git add .
git commit -m "Preparar backend para deploy"
```

2. **Criar railway.json:**
```bash
cat > railway.json << EOF
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health"
  }
}
EOF
```

3. **Atualizar package.json:**
Certifique-se que tem:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon --exec ts-node src/server.ts"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

4. **Deploy no Railway:**
   - Acesse: https://railway.app
   - Login com GitHub
   - "New Project" → "Deploy from GitHub repo"
   - Selecione seu repositório
   - Selecione a pasta `apps/backend`
   - Railway vai detectar automaticamente e fazer o build!

5. **Configurar variáveis de ambiente:**
   - No Railway, vá em "Variables"
   - Adicione:
     ```
     PORT=8000
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://admin:SuaSenhaForte123@...
     ```

6. **Pegar a URL pública:**
   - Railway vai gerar algo como: `https://meal-eval-api-production.up.railway.app`
   - Teste: `curl https://sua-url.railway.app/api/health`

---

### Opção B: Render (Alternativa Grátis)

1. Acesse: https://render.com
2. "New" → "Web Service"
3. Conecte seu GitHub
4. Escolha o repositório
5. Configure:
   - Name: `meal-evaluations-api`
   - Root Directory: `apps/backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node
6. Adicione variáveis de ambiente (igual Railway)

⚠️ **Render Free Tier:** O servidor "dorme" após 15 min sem uso (primeira requisição demora ~30s)

---

### Opção C: Heroku (Clássico)

1. Instale Heroku CLI: `brew install heroku`
2. Login: `heroku login`
3. Criar app:
```bash
cd apps/backend
heroku create meal-evaluations-api
git push heroku master
heroku config:set MONGODB_URI="mongodb+srv://..."
```

---

## 3️⃣ Frontend na Nuvem

### Opção A: Vercel (Recomendado para React)

**Por que Vercel?**
- ✅ Deploy automático do GitHub
- ✅ Grátis (ilimitado para hobby)
- ✅ CDN global (super rápido)
- ✅ Preview de cada PR

**Passo a Passo:**

1. **Atualizar variáveis de ambiente:**
```bash
cd apps/react-vite

# Criar arquivo .env.production
cat > .env.production << EOF
VITE_APP_API_URL=https://sua-url.railway.app/api
VITE_APP_ENABLE_API_MOCKING=false
EOF
```

2. **Deploy no Vercel:**
   - Acesse: https://vercel.com
   - Login com GitHub
   - "Add New Project"
   - Selecione seu repositório
   - Configure:
     - Framework Preset: **Vite**
     - Root Directory: `apps/react-vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Environment Variables:
     ```
     VITE_APP_API_URL = https://sua-url.railway.app/api
     VITE_APP_ENABLE_API_MOCKING = false
     ```
   - Deploy!

3. **Acessar:**
   - Vercel vai gerar: `https://seu-app.vercel.app`
   - Pronto! Seu app está na internet! 🎉

---

### Opção B: Netlify (Alternativa)

1. Acesse: https://netlify.com
2. "Add new site" → "Import from Git"
3. Configure:
   - Base directory: `apps/react-vite`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment variables (igual Vercel)

---

## 4️⃣ Configurar CORS no Backend

Atualize o backend para aceitar requisições do seu domínio:

```typescript
// apps/backend/src/server.ts
app.use(cors({
  origin: [
    'http://localhost:3000',           // Desenvolvimento
    'https://seu-app.vercel.app',      // Produção
    'https://seu-dominio.com'          // Seu domínio customizado
  ],
  credentials: true
}));
```

---

## 🔄 Fluxo Completo na Internet

```
Usuário (Qualquer Lugar do Mundo)
    ↓
https://seu-app.vercel.app (Frontend - Vercel CDN)
    ↓ API Request
https://meal-eval-api.railway.app/api (Backend - Railway)
    ↓ Database Query
mongodb+srv://clusters.mongodb.net (MongoDB Atlas)
    ↓ Retorna Dados
Backend processa
    ↓ JSON Response
Frontend renderiza
    ↓
Usuário vê os dados! ✅
```

---

## 💰 Custos (Estimativa)

| Serviço | Plano Free | Limite |
|---------|-----------|--------|
| MongoDB Atlas | M0 | 512MB, 100 conexões |
| Railway | $5/mês crédito | ~500h/mês |
| Vercel | Unlimited | Hobby projects |
| **Total** | **R$ 0,00** | Suficiente para testar e projetos pequenos |

---

## 🎯 Ordem Recomendada de Deploy

1. ✅ **MongoDB Atlas** (banco de dados primeiro)
2. ✅ **Backend Railway** (API conecta no Atlas)
3. ✅ **Frontend Vercel** (conecta na API)

---

## 🧪 Testar Tudo

Depois de fazer o deploy:

```bash
# 1. Teste o backend
curl https://sua-api.railway.app/api/health

# 2. Teste criar avaliação
curl -X POST https://sua-api.railway.app/api/meal-evaluations \
  -H "Content-Type: application/json" \
  -d '{"mealId":"1","nutrition":5,"satisfaction":4}'

# 3. Teste buscar avaliações
curl https://sua-api.railway.app/api/meal-evaluations

# 4. Acesse o frontend
open https://seu-app.vercel.app
```

---

## 🔐 Segurança (Próximos Passos)

Depois que estiver funcionando:

1. **Variáveis de ambiente seguras** - Nunca commite senhas
2. **HTTPS apenas** - Railway e Vercel já fazem isso
3. **Rate limiting** - Prevenir abuso da API
4. **Autenticação** - Proteger rotas privadas
5. **Validação de dados** - Sanitizar inputs

---

## 📚 Links Úteis

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Railway: https://railway.app
- Vercel: https://vercel.com
- Render: https://render.com
- Heroku: https://heroku.com
- Netlify: https://netlify.com

---

## 🆘 Troubleshooting

### Backend não conecta no MongoDB Atlas
```bash
# Verifique:
1. IP liberado no Network Access (0.0.0.0/0)
2. Usuário e senha corretos
3. Nome do banco na connection string
4. Connection string nas variáveis de ambiente
```

### Frontend não conecta no Backend
```bash
# Verifique:
1. VITE_APP_API_URL está correto
2. CORS configurado no backend
3. Backend está rodando (abra a URL no navegador)
```

### Railway dá erro no build
```bash
# Verifique:
1. package.json tem script "build" e "start"
2. tsconfig.json está correto
3. Todas as dependências estão no package.json
```

---

Pronto! Com isso você tem seu app rodando 24/7 na internet, acessível de qualquer lugar do mundo! 🌍🚀

