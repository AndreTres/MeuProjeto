<?php
/**
 * Arquivo de configuração do banco de dados
 * Centraliza a conexão com MySQL usando PDO
 */

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'meuprojeto';
$username = 'root';  // Usuário padrão do WampServer
$password = '';      // Senha padrão do WampServer (vazia)

try {
    // Criação da conexão PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // Configurações do PDO para melhor tratamento de erros
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Define o timezone para evitar problemas com timestamps
    date_default_timezone_set('America/Sao_Paulo');
    
} catch (PDOException $e) {
    // Em caso de erro na conexão, exibe mensagem amigável
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}

/**
 * Função para retornar resposta JSON padronizada
 * @param bool $success - Indica se a operação foi bem-sucedida
 * @param string $message - Mensagem de retorno
 * @param mixed $data - Dados adicionais (opcional)
 */
function jsonResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    // Define o header para JSON
    header('Content-Type: application/json; charset=utf-8');
    
    // Retorna a resposta em JSON
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}
?>

