<?php
/**
 * Arquivo para listagem de usuários
 * Retorna em HTML todos os usuários cadastrados
 * Campos exibidos: id, email, created_at
 */

// Inclui o arquivo de configuração
require_once 'config.php';

try {
    // Busca todos os usuários (apenas campos seguros)
    $stmt = $pdo->prepare("SELECT id, email, created_at FROM users ORDER BY created_at DESC");
    $stmt->execute();
    $users = $stmt->fetchAll();
    
    // Conta o total de usuários
    $totalUsers = count($users);
    
} catch (PDOException $e) {
    // Log do erro (em produção, use um sistema de logs adequado)
    error_log("Erro na listagem: " . $e->getMessage());
    die('Erro interno do servidor');
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Usuários - MeuProjeto</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1C1C1C 0%, #2C2C2C 100%);
            color: #ffffff;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 75, 0, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            color: #FF4B00;
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .stats {
            background: rgba(255, 75, 0, 0.1);
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
            border: 1px solid rgba(255, 75, 0, 0.3);
        }
        
        .users-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        
        .users-table th,
        .users-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .users-table th {
            background: rgba(255, 75, 0, 0.2);
            color: #FF4B00;
            font-weight: bold;
        }
        
        .users-table tr:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        
        .no-users {
            text-align: center;
            color: #cccccc;
            font-style: italic;
            padding: 2rem;
        }
        
        .back-link {
            display: inline-block;
            margin-top: 2rem;
            padding: 10px 20px;
            background: #FF4B00;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s ease;
        }
        
        .back-link:hover {
            background: #e63900;
        }
        
        .user-id {
            color: #FF4B00;
            font-weight: bold;
        }
        
        .user-email {
            color: #ffffff;
        }
        
        .user-date {
            color: #cccccc;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Lista de Usuários</h1>
        
        <div class="stats">
            <strong>Total de usuários cadastrados: <?php echo $totalUsers; ?></strong>
        </div>
        
        <?php if ($totalUsers > 0): ?>
            <table class="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Data de Cadastro</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td class="user-id">#<?php echo $user['id']; ?></td>
                            <td class="user-email"><?php echo htmlspecialchars($user['email']); ?></td>
                            <td class="user-date"><?php echo date('d/m/Y H:i', strtotime($user['created_at'])); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <div class="no-users">
                <p>Nenhum usuário cadastrado ainda.</p>
                <p>Que tal <a href="../index.html" style="color: #FF4B00;">cadastrar o primeiro usuário</a>?</p>
            </div>
        <?php endif; ?>
        
        <a href="../index.html" class="back-link">← Voltar ao início</a>
    </div>
</body>
</html>