<?php
/**
 * Arquivo para listagem de usuários
 * Retorna em JSON todos os usuários cadastrados
 * Campos retornados: id, email, created_at
 */

// Inclui o arquivo de configuração
require_once 'config.php';

// Verifica se a requisição é GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(false, 'Método não permitido. Use GET.');
}

try {
    // Busca todos os usuários (apenas campos seguros)
    $stmt = $pdo->prepare("SELECT id, email, created_at FROM users ORDER BY created_at DESC");
    $stmt->execute();
    $users = $stmt->fetchAll();
    
    // Conta o total de usuários
    $totalUsers = count($users);
    
    // Prepara os dados de retorno
    $data = [
        'total' => $totalUsers,
        'users' => $users
    ];
    
    jsonResponse(true, 'Lista de usuários obtida com sucesso!', $data);
    
} catch (PDOException $e) {
    // Log do erro (em produção, use um sistema de logs adequado)
    error_log("Erro na listagem: " . $e->getMessage());
    jsonResponse(false, 'Erro interno do servidor');
}
?>

