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
    die('Método não permitido. Use POST.');
}

// Verifica se os campos obrigatórios foram enviados
if (!isset($_POST['email']) || !isset($_POST['password'])) {
    die('Campos obrigatórios: email e password');
}

// Obtém e sanitiza os dados
$email = trim($_POST['email']);
$password = $_POST['password'];

// Validações básicas
if (empty($email) || empty($password)) {
    die('Email e password são obrigatórios');
}

// Validação de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('Email inválido');
}

try {
    // Busca o usuário pelo email
    $stmt = $pdo->prepare("SELECT id, email, password, created_at FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    // Verifica se o usuário existe
    if (!$user) {
        die('Credenciais inválidas');
    }
    
    // Verifica a senha usando password_verify
    if (password_verify($password, $user['password'])) {
        echo '<h2 style="color: green; text-align: center; margin: 20px;">Login realizado com sucesso!</h2>';
        echo '<p style="text-align: center; margin: 20px;">Bem-vindo, ' . htmlspecialchars($user['email']) . '!</p>';
        echo '<p style="text-align: center; margin: 20px;">ID: ' . $user['id'] . '</p>';
        echo '<p style="text-align: center; margin: 20px;">Cadastrado em: ' . $user['created_at'] . '</p>';
        echo '<p style="text-align: center; margin: 20px;"><a href="../index.html" style="color: #FF4B00; text-decoration: none;">Voltar ao início</a></p>';
        echo '<p style="text-align: center; margin: 20px;"><a href="list_users.php" style="color: #FF4B00; text-decoration: none;">Ver todos os usuários</a></p>';
    } else {
        die('Credenciais inválidas');
    }
    
} catch (PDOException $e) {
    // Log do erro (em produção, use um sistema de logs adequado)
    error_log("Erro no login: " . $e->getMessage());
    die('Erro interno do servidor');
}
?>

