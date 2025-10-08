# 🍃 MongoDB Setup

## Opção 1: MongoDB Local (Desenvolvimento)

### macOS (Homebrew)
```bash
# Instalar MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community

# Verificar se está rodando
brew services list
```

### Docker (Qualquer SO)
```bash
# Rodar MongoDB em container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=meal-evaluations \
  mongo:latest

# Parar container
docker stop mongodb

# Iniciar container novamente
docker start mongodb
```

## Opção 2: MongoDB Atlas (Cloud - Grátis)

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um cluster (tier gratuito: M0)
4. Em "Database Access", crie um usuário
5. Em "Network Access", adicione seu IP (ou 0.0.0.0/0 para qualquer IP)
6. Clique em "Connect" > "Connect your application"
7. Copie a connection string

### Atualizar .env com MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meal-evaluations?retryWrites=true&w=majority
```

## Verificar Conexão

### MongoDB Compass (GUI)
- Download: https://www.mongodb.com/try/download/compass
- Conecte com: `mongodb://localhost:27017`

### MongoDB Shell
```bash
# Instalar mongosh
brew install mongosh

# Conectar
mongosh mongodb://localhost:27017/meal-evaluations

# Ver documentos
db.mealevaluations.find()
```

## Comandos Úteis

```bash
# Ver todas as avaliações
mongosh mongodb://localhost:27017/meal-evaluations --eval "db.mealevaluations.find().pretty()"

# Contar documentos
mongosh mongodb://localhost:27017/meal-evaluations --eval "db.mealevaluations.countDocuments()"

# Limpar todas as avaliações
mongosh mongodb://localhost:27017/meal-evaluations --eval "db.mealevaluations.deleteMany({})"
```

