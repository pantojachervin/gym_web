<?php
require_once '../api/config.php';

$request_method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'User ID required']);
    exit;
}

$user_id = (int)$_GET['user_id'];

switch ($request_method) {
    case 'GET':
        getWishlist($user_id);
        break;
    
    case 'POST':
        addToWishlist($user_id, $input);
        break;
    
    case 'DELETE':
        removeFromWishlist($user_id, $input);
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        break;
}

function getWishlist($user_id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT product_id FROM wishlist WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $wishlist = [];
    while ($row = $result->fetch_assoc()) {
        $wishlist[] = (int)$row['product_id'];
    }
    
    echo json_encode(['success' => true, 'wishlist' => $wishlist]);
    $stmt->close();
}

function addToWishlist($user_id, $data) {
    global $conn;
    
    $product_id = $data['product_id'] ?? null;
    
    if (!$product_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Product ID required']);
        exit;
    }
    
    // Check if already in wishlist
    $check = $conn->prepare("SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?");
    $check->bind_param("ii", $user_id, $product_id);
    $check->execute();
    
    if ($check->get_result()->num_rows > 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Already in wishlist']);
        exit;
    }
    
    $stmt = $conn->prepare("INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $product_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Added to wishlist']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to add to wishlist']);
    }
    
    $stmt->close();
    $check->close();
}

function removeFromWishlist($user_id, $data) {
    global $conn;
    
    $product_id = $data['product_id'] ?? null;
    
    if (!$product_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Product ID required']);
        exit;
    }
    
    $stmt = $conn->prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $user_id, $product_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Removed from wishlist']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to remove from wishlist']);
    }
    
    $stmt->close();
}
?>
