-- Script para inserir dados de exemplo no banco de dados
-- Execute após criar as tabelas com as migrações

-- Inserir usuários de exemplo
INSERT INTO users (id, email, name, password, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@example.com', 'Administrador', 'admin123', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'user1@example.com', 'Usuário 1', 'user123', NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'user2@example.com', 'Usuário 2', 'user123', NOW(), NOW());

-- Inserir produtos de exemplo
INSERT INTO products (id, name, description, price, stock, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'iPhone 15', 'Smartphone Apple iPhone 15 128GB', 4999.99, 50, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'MacBook Pro', 'Notebook Apple MacBook Pro 14" M3', 12999.99, 25, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'AirPods Pro', 'Fones de ouvido Apple AirPods Pro', 1999.99, 100, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440007', 'iPad Air', 'Tablet Apple iPad Air 10.9"', 3999.99, 30, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440008', 'Apple Watch', 'Smartwatch Apple Watch Series 9', 2999.99, 75, NOW(), NOW());

-- Verificar dados inseridos
SELECT 'Usuários inseridos:' as info;
SELECT id, email, name, created_at FROM users;

SELECT 'Produtos inseridos:' as info;
SELECT id, name, price, stock, created_at FROM products;
