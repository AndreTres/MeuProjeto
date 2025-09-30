-- Script SQL para criação do banco de dados e tabela
-- Execute este script no phpMyAdmin ou MySQL Workbench

-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS meu_sistema 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco de dados
USE meu_sistema;

-- Criação da tabela users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserção de dados de exemplo (opcional)
-- Descomente as linhas abaixo se quiser inserir usuários de teste
-- INSERT INTO users (email, password) VALUES 
-- ('admin@teste.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
-- ('usuario@teste.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Verificação da estrutura da tabela
DESCRIBE users;

