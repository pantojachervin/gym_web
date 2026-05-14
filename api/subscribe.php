<?php
require_once '../api/config.php';

$request_method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch ($request_method) {
    case 'POST':
        subscribeNewsletter($input);
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        break;
}

function subscribeNewsletter($data) {
    global $conn;
    
    $email = $data['email'] ?? '';
    $user_id = $data['user_id'] ?? null;
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Valid email is required']);
        exit;
    }
    
    // Check if already subscribed
    $check = $conn->prepare("SELECT id FROM newsletter_subscriptions WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    
    if ($check->get_result()->num_rows > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Email already subscribed',
            'already_subscribed' => true
        ]);
        exit;
    }
    
    // Subscribe
    if ($user_id) {
        $stmt = $conn->prepare("INSERT INTO newsletter_subscriptions (email, user_id) VALUES (?, ?)");
        $stmt->bind_param("si", $email, $user_id);
    } else {
        $stmt = $conn->prepare("INSERT INTO newsletter_subscriptions (email) VALUES (?)");
        $stmt->bind_param("s", $email);
    }
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Successfully subscribed to newsletter'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to subscribe']);
    }
    
    $stmt->close();
    $check->close();
}
?>
