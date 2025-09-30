<?php
/**
 * Arquivo para cadastro de usuários
 * Recebe via POST: email, password
 * Cadastra no banco com password_hash
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

// Validação de senha (mínimo 6 caracteres)
if (strlen($password) < 6) {
    die('A senha deve ter pelo menos 6 caracteres');
}

try {
    // Verifica se o email já existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        die('Este email já está cadastrado');
    }
    
    // Criptografa a senha usando password_hash
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insere o novo usuário no banco
    $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $result = $stmt->execute([$email, $hashedPassword]);
    
    if ($result) {
        echo '<h2 style="color: green; text-align: center; margin: 20px;">Usuário cadastrado com sucesso!</h2>';
        echo '<p style="text-align: center; margin: 20px;">Email: ' . htmlspecialchars($email) . '</p>';
        echo '<p style="text-align: center; margin: 20px;"><a href="../index.html" style="color: #FF4B00; text-decoration: none;">Voltar ao início</a></p>';
    } else {
        die('Erro ao cadastrar usuário');
    }
    
} catch (PDOException $e) {
    // Log do erro (em produção, use um sistema de logs adequado)
    error_log("Erro no cadastro: " . $e->getMessage());
    die('Erro interno do servidor');
}
?>

