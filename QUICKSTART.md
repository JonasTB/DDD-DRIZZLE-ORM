# 🚀 Guia de Início Rápido

## ⚡ Setup em 5 minutos

### 1. Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### 2. Clone e Configure
```bash
git clone <repository-url>
cd ddd-drizzle
```

### 3. Setup Automático (Recomendado)
```bash
./scripts/dev-setup.sh
```

### 4. Setup Manual
```bash
# Instalar dependências
npm install

# Configurar ambiente
cp env.example .env

# Subir banco
docker-compose up postgres -d

# Aguardar e executar migrações
sleep 10
npm run db:generate
npm run db:migrate

# Iniciar aplicação
npm run start:dev
```

### 5. Acessar
- **API**: http://localhost:3000
- **Documentação**: http://localhost:3000/api
- **Banco**: localhost:5432 (postgres/postgres)

## 🧪 Testes Rápidos

```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 🐳 Docker

```bash
# Subir tudo
docker-compose up

# Apenas banco
docker-compose up postgres -d

# Build da aplicação
docker build -t ddd-drizzle-app .
```

## 📊 Banco de Dados

```bash
# Gerar migrações
npm run db:generate

# Executar migrações
npm run db:migrate

# Drizzle Studio
npm run db:studio

# Dados de exemplo
psql -h localhost -U postgres -d ddd_drizzle -f scripts/seed-data.sql
```

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod

# Qualidade
npm run lint
npm run format
```

## 📁 Estrutura Principal

```
src/
├── domain/          # Entidades e interfaces
├── application/     # Casos de uso e DTOs
├── infrastructure/  # Banco e repositórios
└── modules/         # Controladores NestJS
```

## 🆘 Problemas Comuns

### Erro de conexão com banco
```bash
# Verificar se o PostgreSQL está rodando
docker-compose ps

# Reiniciar o banco
docker-compose restart postgres
```

### Erro de migração
```bash
# Limpar e recriar
npm run db:generate
npm run db:migrate
```

### Porta em uso
```bash
# Verificar processos na porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>
```

## 📚 Próximos Passos

1. Explore a documentação Swagger em `/api`
2. Teste os endpoints CRUD
3. Modifique as entidades conforme necessário
4. Adicione novos casos de uso
5. Implemente autenticação JWT
6. Adicione validações customizadas

## 🎯 Endpoints para Testar

```bash
# Usuários
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","password":"123456"}'

curl http://localhost:3000/users

# Produtos
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","description":"Test","price":99.99,"stock":100}'

curl http://localhost:3000/products
```

---

**🎉 Parabéns! Sua aplicação DDD com NestJS e Drizzle está rodando!**
