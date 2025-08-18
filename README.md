# DDD Drizzle NestJS Application

Uma aplicação NestJS completa seguindo os padrões de Domain-Driven Design (DDD) com Drizzle ORM, testes e Docker.

## 🏗️ Arquitetura

Esta aplicação segue os princípios do DDD com as seguintes camadas:

- **Domain**: Entidades, interfaces de repositório e regras de negócio
- **Application**: Casos de uso (use cases) e DTOs
- **Infrastructure**: Implementações concretas (repositórios, banco de dados)
- **Interfaces**: Controladores e apresentação da API

## 🚀 Tecnologias

- **NestJS**: Framework para aplicações Node.js
- **Drizzle ORM**: ORM moderno e type-safe para TypeScript
- **PostgreSQL**: Banco de dados relacional
- **Docker**: Containerização da aplicação
- **Jest**: Framework de testes
- **Swagger**: Documentação da API
- **Biome**: Formatador e linter de código rápido e moderno

## ✅ Status Atual

**A aplicação está funcionando perfeitamente!** 🎉

- ✅ NestJS rodando na porta 3000
- ✅ PostgreSQL conectado via Docker
- ✅ API endpoints funcionando (CRUD completo)
- ✅ Documentação Swagger disponível em `/api`
- ✅ Migrações do banco aplicadas
- ✅ Estrutura DDD implementada
- ✅ Testes configurados e passando

## 📁 Estrutura do Projeto

```
src/
├── main.ts                    # Ponto de entrada da aplicação
├── app.module.ts              # Módulo principal da aplicação
├── domain/                    # Camada de domínio
│   ├── users/                # Entidades e interfaces de usuário
│   │   ├── entities/         # Entidades de domínio
│   │   └── repositories/     # Interfaces de repositório
│   └── products/             # Entidades e interfaces de produto
│       ├── entities/         # Entidades de domínio
│       └── repositories/     # Interfaces de repositório
├── application/              # Camada de aplicação
│   ├── users/               # Casos de uso e DTOs de usuário
│   │   ├── dto/             # Data Transfer Objects
│   │   └── usecases/        # Casos de uso da aplicação
│   └── products/            # Casos de uso e DTOs de produto
│       ├── dto/             # Data Transfer Objects
│       └── usecases/        # Casos de uso da aplicação
├── infrastructure/           # Camada de infraestrutura
│   ├── database/            # Configuração e schemas do banco
│   │   ├── schema/          # Schemas do Drizzle
│   │   ├── database.module.ts
│   │   └── database.service.ts
│   └── repositories/        # Implementações dos repositórios
├── modules/                 # Módulos NestJS
│   ├── users/              # Módulo de usuários
│   └── products/           # Módulo de produtos
└── common/                  # Utilitários e código compartilhado
    └── utils/               # Utilitários comuns
        └── logger.utils.ts  # Utilitário de logging
```

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (se não usar Docker)

### Passos

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd ddd-drizzle
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Suba o banco de dados com Docker**
   ```bash
   docker-compose up postgres -d
   ```

5. **Execute as migrações**
   ```bash
   npx drizzle-kit generate:pg
   npx drizzle-kit up:pg
   ```

6. **Inicie a aplicação**
   ```bash
   npm run start:dev
   ```

## 🐳 Docker

### Desenvolvimento
```bash
# Subir apenas o banco de dados
docker-compose up postgres -d

# Subir toda a aplicação
docker-compose up
```

### Produção
```bash
# Build da imagem
docker build -t ddd-drizzle-app .

# Executar container
docker run -p 3000:3000 ddd-drizzle-app
```

## 🧪 Testes

### Testes Unitários
```bash
npm run test
```

### Testes com Coverage
```bash
npm run test:cov
```

### Testes E2E
```bash
npm run test:e2e
```

### Testes em Modo Watch
```bash
npm run test:watch
```

## 📊 Banco de Dados

### Comandos do Drizzle

```bash
# Gerar migrações
npx drizzle-kit generate:pg

# Executar migrações
npx drizzle-kit up:pg

# Abrir Drizzle Studio
npx drizzle-kit studio

# Push direto para o banco (desenvolvimento)
npx drizzle-kit push:pg
```

### Schemas

A aplicação inclui dois schemas principais:

- **Users**: Gerenciamento de usuários
- **Products**: Gerenciamento de produtos

## 🔌 API Endpoints

### Usuários

- `POST /users` - Criar usuário
- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Produtos

- `POST /products` - Criar produto
- `GET /products` - Listar todos os produtos
- `GET /products/:id` - Buscar produto por ID
- `PATCH /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

### Documentação Swagger

Acesse `/api` para ver a documentação completa da API.

## 🧪 Teste Rápido

Após iniciar a aplicação, você pode testar rapidamente:

```bash
# Testar criação de usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@example.com", "password": "123456"}'

# Testar listagem de usuários
curl http://localhost:3000/users

# Testar criação de produto
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Notebook", "description": "Notebook Dell", "price": 2999.99, "stock": 10}'

# Testar listagem de produtos
curl http://localhost:3000/products
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Iniciar em modo desenvolvimento
npm run start:debug    # Iniciar em modo debug

# Produção
npm run build          # Build da aplicação
npm run start:prod     # Iniciar em modo produção

# Banco de dados
npx drizzle-kit generate:pg    # Gerar migrações
npx drizzle-kit up:pg          # Executar migrações
npx drizzle-kit studio         # Abrir Drizzle Studio
npx drizzle-kit push:pg        # Push direto para o banco

# Testes
npm run test           # Executar testes
npm run test:watch     # Testes em modo watch
npm run test:cov       # Testes com coverage
npm run test:e2e       # Testes end-to-end

# Qualidade de código
npm run format         # Formatar código com Biome
npm run lint           # Executar linting com Biome
```

## 🌍 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `DB_HOST` | Host do banco de dados | `localhost` |
| `DB_PORT` | Porta do banco de dados | `5432` |
| `DB_USER` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` |
| `DB_NAME` | Nome do banco | `ddd_drizzle` |
| `PORT` | Porta da aplicação | `3000` |
| `NODE_ENV` | Ambiente da aplicação | `development` |

## 📝 Padrões DDD Implementados

### Entidades
- **User**: Entidade de usuário com métodos de negócio
- **Product**: Entidade de produto com métodos de negócio

### Repositórios
- **IUserRepository**: Interface para repositório de usuários
- **IProductRepository**: Interface para repositório de produtos
- Implementações concretas usando Drizzle ORM

### Casos de Uso
- **CreateUserUseCase**: Criação de usuários
- **GetUserUseCase**: Busca de usuário por ID
- **GetAllUsersUseCase**: Listagem de todos os usuários
- **UpdateUserUseCase**: Atualização de usuários
- **DeleteUserUseCase**: Remoção de usuários
- **CreateProductUseCase**: Criação de produtos
- **GetProductUseCase**: Busca de produto por ID
- **GetAllProductsUseCase**: Listagem de todos os produtos
- **UpdateProductUseCase**: Atualização de produtos
- **DeleteProductUseCase**: Remoção de produtos

### Utilitários Comuns
- **Logger Utils**: Utilitário de logging centralizado na pasta `common/utils/`

## 🚀 Deploy

### Docker Compose (Recomendado)
```bash
docker-compose up -d
```

### Docker Individual
```bash
# Build
docker build -t ddd-drizzle-app .

# Run
docker run -p 3000:3000 --env-file .env ddd-drizzle-app
```

### Manual
```bash
npm run build
npm run start:prod
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a documentação
2. Procure por issues existentes
3. Crie uma nova issue com detalhes do problema

## 🔮 Roadmap

- [ ] Autenticação JWT
- [ ] Autorização baseada em roles
- [x] Logs estruturados ✅
- [ ] Métricas e monitoramento
- [ ] Cache com Redis
- [ ] Filas com Bull
- [ ] Testes de integração com banco real
- [ ] CI/CD pipeline
- [ ] Kubernetes manifests
