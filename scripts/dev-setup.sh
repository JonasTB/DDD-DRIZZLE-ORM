#!/bin/bash

echo "🚀 Configurando ambiente de desenvolvimento..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js 18+"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker"
    exit 1
fi

echo "✅ Docker encontrado: $(docker --version)"

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose"
    exit 1
fi

echo "✅ Docker Compose encontrado: $(docker-compose --version)"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Copiar arquivo de ambiente
if [ ! -f .env ]; then
    echo "📝 Copiando arquivo de ambiente..."
    cp env.example .env
    echo "⚠️  Por favor, edite o arquivo .env com suas configurações"
else
    echo "✅ Arquivo .env já existe"
fi

# Subir banco de dados
echo "🐳 Subindo banco de dados..."
docker-compose up postgres -d

# Aguardar banco estar disponível
echo "⏳ Aguardando banco de dados..."
sleep 10

# Executar migrações
echo "📊 Executando migrações..."
npm run db:generate
npm run db:migrate

echo "🎉 Ambiente configurado com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Edite o arquivo .env se necessário"
echo "2. Execute: npm run start:dev"
echo "3. Acesse: http://localhost:3000"
echo "4. Documentação: http://localhost:3000/api"
