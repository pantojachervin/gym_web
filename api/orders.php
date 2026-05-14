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
        getOrders($user_id);
        break;
    
    case 'POST':
        createOrder($user_id, $input);
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        break;
}

function getOrders($user_id) {
    global $conn;
    
    $stmt = $conn->prepare(
        "SELECT o.id, o.order_number, o.total, o.status, o.shipping_cost, o.created_at, a.city, a.country
         FROM orders o
         LEFT JOIN addresses a ON o.address_id = a.id
         WHERE o.user_id = ?
         ORDER BY o.created_at DESC"
    );
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        // Get order items
        $items_stmt = $conn->prepare(
            "SELECT product_id, product_name, quantity, product_price FROM order_items WHERE order_id = ?"
        );
        $items_stmt->bind_param("i", $row['id']);
        $items_stmt->execute();
        $items_result = $items_stmt->get_result();
        
        $items = [];
        while ($item = $items_result->fetch_assoc()) {
            $items[] = $item;
        }
        $items_stmt->close();
        
        $orders[] = [
            'id' => $row['order_number'],
            'total' => $row['total'],
            'status' => $row['status'],
            'date' => date('M d, Y', strtotime($row['created_at'])),
            'address' => $row['city'] . ', ' . $row['country'],
            'items' => $items
        ];
    }
    
    echo json_encode(['success' => true, 'orders' => $orders]);
    $stmt->close();
}

function createOrder($user_id, $data) {
    global $conn;
    
    $cart_items = $data['items'] ?? [];
    $address_data = $data['address'] ?? [];
    $total = $data['total'] ?? 0;
    $shipping_cost = $data['shipping_cost'] ?? 0;
    
    if (empty($cart_items)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Cart is empty']);
        exit;
    }
    
    // Start transaction
    $conn->begin_transaction();
    
    try {
        $order_number = 'FF-' . date('YmdHis') . '-' . substr(md5(uniqid()), 0, 6);
        
        // Create or use existing address
        $address_id = null;
        if (!empty($address_data['address'])) {
            $addr_stmt = $conn->prepare(
                "INSERT INTO addresses (user_id, first_name, last_name, email, phone, address, city, zip, country) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $first_name = $address_data['first_name'] ?? '';
            $last_name = $address_data['last_name'] ?? '';
            $email = $address_data['email'] ?? '';
            $phone = $address_data['phone'] ?? '';
            $address = $address_data['address'] ?? '';
            $city = $address_data['city'] ?? '';
            $zip = $address_data['zip'] ?? '';
            $country = $address_data['country'] ?? '';
            
            $addr_stmt->bind_param(
                "issssssss",
                $user_id, $first_name, $last_name, $email, $phone, $address, $city, $zip, $country
            );
            $addr_stmt->execute();
            $address_id = $conn->insert_id;
            $addr_stmt->close();
        }
        
        // Create order
        $order_stmt = $conn->prepare(
            "INSERT INTO orders (user_id, order_number, address_id, total, shipping_cost, status) 
             VALUES (?, ?, ?, ?, ?, 'processing')"
        );
        $order_stmt->bind_param(
            "isidi",
            $user_id, $order_number, $address_id, $total, $shipping_cost
        );
        $order_stmt->execute();
        $order_id = $conn->insert_id;
        $order_stmt->close();
        
        // Add items to order
        foreach ($cart_items as $item) {
            $product_id = $item['id'] ?? null;
            $product_name = $item['name'] ?? '';
            $quantity = $item['qty'] ?? 1;
            $product_price = $item['price'] ?? 0;
            
            $item_stmt = $conn->prepare(
                "INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price) 
                 VALUES (?, ?, ?, ?, ?)"
            );
            $item_stmt->bind_param(
                "iisii",
                $order_id, $product_id, $product_name, $quantity, $product_price
            );
            $item_stmt->execute();
            $item_stmt->close();
        }
        
        // Clear user's cart
        $clear_cart = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
        $clear_cart->bind_param("i", $user_id);
        $clear_cart->execute();
        $clear_cart->close();
        
        $conn->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Order created successfully',
            'order_id' => $order_number
        ]);
        
    } catch (Exception $e) {
        $conn->rollback();
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to create order: ' . $e->getMessage()]);
    }
}
?>
