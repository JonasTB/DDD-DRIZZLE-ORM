#!/bin/bash

echo "🚀 Inicializando banco de dados..."

# Aguardar o PostgreSQL estar disponível
echo "⏳ Aguardando PostgreSQL..."
until pg_isready -h localhost -p 5432 -U postgres; do
  echo "PostgreSQL não está disponível ainda..."
  sleep 2
done

echo "✅ PostgreSQL está disponível!"

# Executar migrações
echo "📊 Executando migrações..."
npm run db:generate
npm run db:migrate

echo "🎉 Banco de dados inicializado com sucesso!"
