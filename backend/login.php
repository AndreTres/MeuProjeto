<?php
/**
 * Arquivo para login de usuários
 * Recebe via POST: email, password
 * Verifica credenciais usando password_verify
 */

// Inclui o arquivo de configuração
require_once 'config.php';

// Verifica se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Método não permitido. Use POST.');
}

// Verifica se os campos obrigatórios foram enviados
if (!isset($_POST['email']) || !isset($_POST['password'])) {
    jsonResponse(false, 'Campos obrigatórios: email e password');
}

// Obtém e sanitiza os dados
$email = trim($_POST['email']);
$password = $_POST['password'];

// Validações básicas
if (empty($email) || empty($password)) {
    jsonResponse(false, 'Email e password são obrigatórios');
}

// Validação de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Email inválido');
}

try {
    // Busca o usuário pelo email
    $stmt = $pdo->prepare("SELECT id, email, password, created_at FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    // Verifica se o usuário existe
    if (!$user) {
        jsonResponse(false, 'Email ou senha incorretos');
    }
    
    // Verifica a senha usando password_verify
    if (password_verify($password, $user['password'])) {
        // Remove a senha dos dados de retorno por segurança
        unset($user['password']);
        
        jsonResponse(true, 'Login realizado com sucesso!', $user);
    } else {
        jsonResponse(false, 'Email ou senha incorretos');
    }
    
} catch (PDOException $e) {
    // Log do erro (em produção, use um sistema de logs adequado)
    error_log("Erro no login: " . $e->getMessage());
    jsonResponse(false, 'Erro interno do servidor');
}
?>

