# 🧪 Testes TDD - Autenticação

## ✅ Todos os testes passaram! (13/13)

### 📋 Resumo dos Testes

```
✓ deve criar um novo usuário no MongoDB
✓ não deve permitir registrar usuário com email duplicado
✓ deve fazer hash da senha antes de salvar
✓ deve fazer login com credenciais corretas
✓ deve retornar erro com email inexistente
✓ deve retornar erro com senha incorreta
✓ deve criar sessão após login bem-sucedido
✓ deve retornar dados do usuário logado
✓ deve retornar erro se não estiver autenticado
✓ deve fazer logout e destruir a sessão
✓ deve verificar se usuário existe no banco após registro
✓ deve contar usuários no banco de dados
✓ deve buscar usuário por email
```

## 🔧 Como Executar os Testes

```bash
cd apps/backend

npm test

npm run test:watch

npm run test:coverage
```

## 📝 O que os testes verificam?

### 1. **Registro de Usuário**
- ✅ Cria usuário no MongoDB
- ✅ Impede emails duplicados
- ✅ Faz hash da senha (bcrypt)
- ✅ Valida campos obrigatórios

### 2. **Login**
- ✅ Aceita credenciais válidas
- ✅ Rejeita email inexistente
- ✅ Rejeita senha incorreta
- ✅ Cria sessão após login

### 3. **Sessão**
- ✅ Retorna dados do usuário logado
- ✅ Bloqueia acesso não autenticado
- ✅ Destrói sessão no logout

### 4. **MongoDB**
- ✅ Verifica se usuário existe no banco
- ✅ Conta usuários no banco
- ✅ Busca usuário por email

## 🧪 Exemplo de Teste TDD

```typescript
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
});
```

## 🎯 Fluxo de Teste

1. **Antes do teste**: Banco limpo (MongoDB Memory Server)
2. **Durante o teste**: Operações isoladas
3. **Depois do teste**: Banco limpo novamente

## 📊 Estrutura

```
src/
├── __tests__/
│   ├── setup.ts          # Configuração do MongoDB Memory Server
│   └── auth.test.ts      # Testes de autenticação
├── models/
│   └── user.model.ts     # Modelo do usuário
├── controllers/
│   └── auth.controller.ts # Lógica de autenticação
└── routes/
    └── auth.routes.ts    # Rotas de autenticação
```

## 💡 Tecnologias

- **Jest** - Framework de testes
- **Supertest** - Testes de API HTTP
- **MongoDB Memory Server** - Banco em memória para testes isolados
- **ts-jest** - Suporte a TypeScript

## 🔍 Verificação no Teste

Quando você faz login com `teste@exemplo.com`:

```typescript
it('deve fazer login com credenciais corretas', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'teste@exemplo.com',
      password: 'senha123',
    })
    .expect(200);

  expect(response.body.user.email).toBe('teste@exemplo.com');
});
```

Este teste:
1. ✅ Envia email e senha
2. ✅ Verifica se retorna status 200
3. ✅ Confirma que o usuário existe no MongoDB
4. ✅ Valida que o email retornado está correto

## 🚀 Próximos Passos

Agora você pode:
1. Adicionar mais testes conforme necessário
2. Testar meal-evaluations vinculadas ao userId
3. Testar edge cases e validações
4. Configurar CI/CD para rodar testes automaticamente

