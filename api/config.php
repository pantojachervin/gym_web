<?php
// Database Configuration - Simple & Clean
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'fitnessfrontier';

// Create connection
$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);

// Set response headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

// Set charset
if ($conn) {
    $conn->set_charset("utf8mb4");
}
?>
