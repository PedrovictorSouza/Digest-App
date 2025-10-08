# 🍽️ Meal Evaluation Backend API

Backend Express.js com MongoDB para gerenciar avaliações de refeições.

## 🚀 Tecnologias

- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **TypeScript** - Type safety
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

### 1. MongoDB

O projeto precisa de uma instância MongoDB rodando. Você tem duas opções:

#### Opção A: MongoDB Local (Desenvolvimento)
```bash
# macOS
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Opção B: MongoDB Atlas (Cloud - Grátis)
1. Crie uma conta em https://www.mongodb.com/cloud/atlas
2. Crie um cluster gratuito (M0)
3. Obtenha a connection string
4. Atualize `.env` com a connection string

Ver mais detalhes em: [MONGODB_SETUP.md](./MONGODB_SETUP.md)

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/meal-evaluations
```

Para MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meal-evaluations
```

## 🏃 Executar

### Desenvolvimento (com hot reload)
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📡 Endpoints

### Health Check
```http
GET /api/health
```

### Criar Avaliação
```http
POST /api/meal-evaluations
Content-Type: application/json

{
  "mealId": "1",
  "nutrition": 5,
  "satisfaction": 4
}
```

**Resposta (201 Created):**
```json
{
  "id": "68e6996de33dd451e072165c",
  "mealId": "1",
  "nutrition": 5,
  "satisfaction": 4,
  "createdAt": "2025-10-08T17:03:41.915Z"
}
```

### Listar Avaliações
```http
GET /api/meal-evaluations
```

**Resposta (200 OK):**
```json
[
  {
    "id": "68e6996de33dd451e072165c",
    "mealId": "1",
    "nutrition": 5,
    "satisfaction": 4,
    "createdAt": "2025-10-08T17:03:41.915Z"
  }
]
```

### Filtrar por Refeição
```http
GET /api/meal-evaluations?mealId=1
```

## 👀 Visualizar Dados do MongoDB

### Ver dados formatados (snapshot)
```bash
npm run view-data
```
Mostra todas as avaliações com estrelinhas e formatação bonita.

### Monitorar em tempo real
```bash
npm run watch-data
```
Atualiza automaticamente a cada 2 segundos quando novos dados são adicionados.

### Via API (JSON)
```bash
curl http://localhost:8000/api/meal-evaluations | jq .
```

## 🗂️ Estrutura de Arquivos

```
apps/backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração MongoDB
│   ├── models/
│   │   └── meal-evaluation.model.ts   # Schema Mongoose
│   ├── controllers/
│   │   └── meal-evaluations.controller.ts  # Lógica de negócio
│   ├── routes/
│   │   └── meal-evaluations.ts  # Rotas da API
│   └── server.ts                # Entry point
├── .env                         # Variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testar API

### cURL
```bash
# Criar avaliação
curl -X POST http://localhost:8000/api/meal-evaluations \
  -H "Content-Type: application/json" \
  -d '{"mealId":"1","nutrition":5,"satisfaction":4}'

# Listar avaliações
curl http://localhost:8000/api/meal-evaluations
```

### MongoDB Shell
```bash
# Ver documentos
mongosh mongodb://localhost:27017/meal-evaluations --eval "db.mealevaluations.find().pretty()"

# Contar documentos
mongosh mongodb://localhost:27017/meal-evaluations --eval "db.mealevaluations.countDocuments()"
```

## 🔄 Migração de Array para MongoDB

Anteriormente os dados eram armazenados em um array em memória (`src/data/db.ts`).
Agora usamos MongoDB para **persistência real** dos dados.

**Vantagens:**
- ✅ Dados persistem após reiniciar o servidor
- ✅ Escalável para produção
- ✅ Queries mais poderosas
- ✅ Backup automático (com Atlas)
- ✅ Índices para performance

## 🌐 CORS

O servidor permite requisições apenas de:
- `http://localhost:3000` (frontend React)

Para permitir outras origens, edite `src/server.ts`:
```typescript
app.use(cors({
  origin: ['http://localhost:3000', 'https://meu-dominio.com'],
  credentials: true
}));
```

## 📝 Validações

- `mealId`: obrigatório, string
- `nutrition`: obrigatório, número entre 1-5
- `satisfaction`: obrigatório, número entre 1-5

## 🐛 Troubleshooting

### Erro: "Connection refused"
```
✅ Solução: Inicie o MongoDB
brew services start mongodb-community
```

### Erro: "EADDRINUSE port 8000"
```
✅ Solução: Mate o processo na porta
lsof -ti:8000 | xargs kill -9
```

### Erro: "Cannot find module"
```
✅ Solução: Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentação

- [MongoDB Setup](./MONGODB_SETUP.md)
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)

