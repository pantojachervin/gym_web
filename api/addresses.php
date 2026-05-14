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
        getAddresses($user_id);
        break;
    
    case 'POST':
        addAddress($user_id, $input);
        break;
    
    case 'PUT':
        updateAddress($user_id, $input);
        break;
    
    case 'DELETE':
        deleteAddress($user_id, $input);
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        break;
}

function getAddresses($user_id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $addresses = [];
    while ($row = $result->fetch_assoc()) {
        $addresses[] = $row;
    }
    
    echo json_encode(['success' => true, 'addresses' => $addresses]);
    $stmt->close();
}

function addAddress($user_id, $data) {
    global $conn;
    
    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $address = $data['address'] ?? '';
    $city = $data['city'] ?? '';
    $zip = $data['zip'] ?? '';
    $country = $data['country'] ?? '';
    $is_default = $data['is_default'] ? 1 : 0;
    
    if (empty($first_name) || empty($address) || empty($city) || empty($country)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Required fields missing']);
        exit;
    }
    
    $stmt = $conn->prepare(
        "INSERT INTO addresses (user_id, first_name, last_name, email, phone, address, city, zip, country, is_default) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("issssssssi", $user_id, $first_name, $last_name, $email, $phone, $address, $city, $zip, $country, $is_default);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Address saved', 'address_id' => $conn->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save address']);
    }
    
    $stmt->close();
}

function updateAddress($user_id, $data) {
    global $conn;
    
    $address_id = $data['address_id'] ?? null;
    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $address = $data['address'] ?? '';
    $city = $data['city'] ?? '';
    $zip = $data['zip'] ?? '';
    $country = $data['country'] ?? '';
    $is_default = $data['is_default'] ? 1 : 0;
    
    if (!$address_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Address ID required']);
        exit;
    }
    
    $stmt = $conn->prepare(
        "UPDATE addresses SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, city = ?, zip = ?, country = ?, is_default = ? 
         WHERE id = ? AND user_id = ?"
    );
    $stmt->bind_param("sssssssssii", $first_name, $last_name, $email, $phone, $address, $city, $zip, $country, $is_default, $address_id, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Address updated']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to update address']);
    }
    
    $stmt->close();
}

function deleteAddress($user_id, $data) {
    global $conn;
    
    $address_id = $data['address_id'] ?? null;
    
    if (!$address_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Address ID required']);
        exit;
    }
    
    $stmt = $conn->prepare("DELETE FROM addresses WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $address_id, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Address deleted']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to delete address']);
    }
    
    $stmt->close();
}
?>
