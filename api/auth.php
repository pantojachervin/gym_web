<?php
require_once '../api/config.php';

// Simple endpoint handling - just register or login
$action = $_POST['action'] ?? $_GET['action'] ?? null;

if ($action === 'register') {
    handleRegister();
} elseif ($action === 'login') {
    handleLogin();
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid action']);
}

function handleRegister() {
    global $conn;
    
    $data = json_decode(file_get_contents("php://input"), true);
    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    // Validation
    if (empty($first_name)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'First name is required']);
        exit;
    }
    if (empty($email)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email is required']);
        exit;
    }
    if (empty($password) || strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Password must be at least 6 characters']);
        exit;
    }
    
    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email already registered']);
        exit;
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $first_name, $last_name, $email, $hashed_password);
    
    if ($stmt->execute()) {
        $user_id = $conn->insert_id;
        echo json_encode([
            'success' => true,
            'message' => 'Account created successfully',
            'user' => [
                'id' => $user_id,
                'email' => $email,
                'name' => $first_name . ($last_name ? ' ' . $last_name : '')
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to create account']);
    }
}

function handleLogin() {
    global $conn;
    
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Email and password required']);
        exit;
    }
    
    // Check if user exists
    $stmt = $conn->prepare("SELECT id, email, password, first_name, last_name FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'User not registered. Please create an account first.']);
        exit;
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Wrong password. Try again.']);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['first_name'] . ($user['last_name'] ? ' ' . $user['last_name'] : '')
        ]
    ]);
}
?>
