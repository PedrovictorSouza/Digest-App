# 🔄 Fluxo Completo: Frontend → Disco Físico

## 1️⃣ Frontend (React)
**Arquivo:** `apps/react-vite/src/features/home/components/home-page.tsx`
**Linha 75-80:**
```typescript
createEvaluation({
  mealId: selectedMeal.id,
  nutrition,
  satisfaction,
})
```

## 2️⃣ API Client (Axios)
**Arquivo:** `apps/react-vite/src/features/meal-evaluation/api/create-evaluation.ts`
**Linha 13:**
```typescript
api.post<Resp>('/meal-evaluations', data)
```
**O que faz:** Envia requisição HTTP POST para http://localhost:8000/api/meal-evaluations

## 3️⃣ Express Router
**Arquivo:** `apps/backend/src/routes/meal-evaluations.ts`
**Linha 6:**
```typescript
router.post('/', createMealEvaluation);
```
**O que faz:** Roteia a requisição POST para o controller

## 4️⃣ Controller (Express)
**Arquivo:** `apps/backend/src/controllers/meal-evaluations.controller.ts`
**Linha 20-24:**
```typescript
const evaluation = await MealEvaluation.create({
  mealId,
  nutrition,
  satisfaction
});
```
**O que faz:** Chama o método `.create()` do Mongoose

## 5️⃣ Mongoose Model
**Arquivo:** `apps/backend/src/models/meal-evaluation.model.ts`
**Linha 35-38:**
```typescript
export const MealEvaluation = mongoose.model<IMealEvaluation>(
  'MealEvaluation',
  MealEvaluationSchema
);
```
**O que faz:** 
- Valida os dados contra o schema
- Adiciona _id, createdAt, updatedAt
- Converte para formato BSON (binário)
- Envia comando para o MongoDB

## 6️⃣ MongoDB Driver (Nativo)
**Código interno do pacote `mongodb` (Node.js driver):**
```javascript
// Dentro de node_modules/mongodb/
db.collection('mealevaluations').insertOne({
  mealId: "1",
  nutrition: 5,
  satisfaction: 4,
  createdAt: ISODate("2025-10-08T17:03:41.915Z"),
  updatedAt: ISODate("2025-10-08T17:03:41.915Z"),
  __v: 0
})
```
**O que faz:** Envia comando via protocolo Wire Protocol para o servidor MongoDB

## 7️⃣ MongoDB Server (mongod)
**Processo rodando na porta 27017**

### Passo A: Recebe o comando
```c++
// Código C++ interno do MongoDB
void insertDocument(Database* db, Document doc) {
  // 1. Valida o documento
  // 2. Adiciona _id se não existir
  // 3. Passa para o WiredTiger
}
```

### Passo B: WiredTiger Storage Engine
```c++
// Motor de armazenamento WiredTiger (escrito em C)
int wiredtiger_insert(WT_SESSION *session, const char *collection, Document *doc) {
  // 1. Serializa o documento em BSON
  // 2. Compacta os dados
  // 3. Escreve no arquivo .wt
  
  FILE *fp = fopen("/opt/homebrew/var/mongodb/collection-0-XXX.wt", "a+b");
  fwrite(bson_data, size, 1, fp);      // ← AQUI SALVA NO DISCO! 💾
  fflush(fp);                           // Força escrita imediata
  fsync(fileno(fp));                    // Sincroniza com disco físico
  fclose(fp);
  
  return 0;
}
```

## 8️⃣ Sistema Operacional (macOS Kernel)
```c
// Chamadas de sistema (syscalls)
write()   → Escreve no buffer do kernel
fsync()   → Força flush do buffer para o disco
```

## 9️⃣ Driver do SSD/HD
**Hardware Controller:**
- Recebe os bytes do kernel
- Escreve fisicamente nas células de memória (SSD) ou nos pratos magnéticos (HD)
- **DADOS SALVOS PERMANENTEMENTE!** ✅

---

## 📊 Resumo do Tempo

```
Frontend       →  ~1ms   (JavaScript)
HTTP           →  ~1ms   (Rede local)
Express        →  <1ms   (Router)
Controller     →  <1ms   (JavaScript)
Mongoose       →  ~2ms   (Validação + Conversão)
MongoDB Driver →  ~1ms   (Serialização)
MongoDB Server →  ~5ms   (WiredTiger)
Disco Físico   →  ~10ms  (SSD) ou ~50ms (HD tradicional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL          ≈  20-60ms do clique até o disco!
```

---

## 🎯 A Linha Mais Importante

Se você quer ver "a linha que salva no disco", ela está **dentro do código C++ do WiredTiger**:

```c
fwrite(bson_data, size, 1, fp);  // Escreve no arquivo .wt
fsync(fileno(fp));                // Garante que foi pro disco
```

Mas você **nunca precisa escrever isso!** 

No seu código, basta:
```typescript
await MealEvaluation.create({ ... })  // Mongoose faz todo o resto! ✨
```

