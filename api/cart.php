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
        getCart($user_id);
        break;
    
    case 'POST':
        addToCart($user_id, $input);
        break;
    
    case 'PUT':
        updateCartItem($user_id, $input);
        break;
    
    case 'DELETE':
        removeFromCart($user_id, $input);
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        break;
}

function getCart($user_id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT c.*, p.price FROM cart c WHERE c.user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $cart = [];
    while ($row = $result->fetch_assoc()) {
        $cart[$row['product_id']] = [
            'quantity' => (int)$row['quantity'],
            'price' => (float)$row['price'],
            'cart_id' => $row['id']
        ];
    }
    
    echo json_encode(['success' => true, 'cart' => $cart]);
    $stmt->close();
}

function addToCart($user_id, $data) {
    global $conn;
    
    $product_id = $data['product_id'] ?? null;
    $quantity = $data['quantity'] ?? 1;
    
    if (!$product_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Product ID required']);
        exit;
    }
    
    // Check if item exists in cart
    $check = $conn->prepare("SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?");
    $check->bind_param("ii", $user_id, $product_id);
    $check->execute();
    $result = $check->get_result();
    
    if ($result->num_rows > 0) {
        // Update existing item
        $row = $result->fetch_assoc();
        $new_qty = $row['quantity'] + $quantity;
        $update = $conn->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?");
        $update->bind_param("iii", $new_qty, $user_id, $product_id);
        $update->execute();
        echo json_encode(['success' => true, 'message' => 'Cart updated']);
        $update->close();
    } else {
        // Insert new item
        $insert = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
        $insert->bind_param("iii", $user_id, $product_id, $quantity);
        if ($insert->execute()) {
            echo json_encode(['success' => true, 'message' => 'Item added to cart']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to add to cart']);
        }
        $insert->close();
    }
    
    $check->close();
}

function updateCartItem($user_id, $data) {
    global $conn;
    
    $product_id = $data['product_id'] ?? null;
    $quantity = $data['quantity'] ?? 1;
    
    if (!$product_id || $quantity < 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid product ID or quantity']);
        exit;
    }
    
    if ($quantity === 0) {
        removeFromCart($user_id, ['product_id' => $product_id]);
        return;
    }
    
    $stmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("iii", $quantity, $user_id, $product_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Cart updated']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to update cart']);
    }
    
    $stmt->close();
}

function removeFromCart($user_id, $data) {
    global $conn;
    
    $product_id = $data['product_id'] ?? null;
    
    if (!$product_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Product ID required']);
        exit;
    }
    
    $stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
    $stmt->bind_param("ii", $user_id, $product_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Item removed from cart']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to remove from cart']);
    }
    
    $stmt->close();
}
?>
