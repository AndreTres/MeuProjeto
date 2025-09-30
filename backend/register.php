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

// Validação de senha (mínimo 6 caracteres)
if (strlen($password) < 6) {
    jsonResponse(false, 'A senha deve ter pelo menos 6 caracteres');
}

try {
    // Verifica se o email já existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        jsonResponse(false, 'Este email já está cadastrado');
    }
    
    // Criptografa a senha usando password_hash
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insere o novo usuário no banco
    $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $result = $stmt->execute([$email, $hashedPassword]);
    
    if ($result) {
        // Busca os dados do usuário recém-criado
        $stmt = $pdo->prepare("SELECT id, email, created_at FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        jsonResponse(true, 'Usuário cadastrado com sucesso!', $user);
    } else {
        jsonResponse(false, 'Erro ao cadastrar usuário');
    }
    
} catch (PDOException $e) {
    // Log do erro (em produção, use um sistema de logs adequado)
    error_log("Erro no cadastro: " . $e->getMessage());
    jsonResponse(false, 'Erro interno do servidor');
}
?>

