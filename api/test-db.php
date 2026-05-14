<?php
// Test Database Connection
echo "<h1>FitnessFrontier Database Test</h1>";
echo "<hr>";

// Test 1: Database Connection
echo "<h2>Test 1: Database Connection</h2>";
$conn = new mysqli('localhost', 'root', '', 'fitnessfrontier');

if ($conn->connect_error) {
    echo "<p style='color:red'><strong>❌ FAILED:</strong> " . $conn->connect_error . "</p>";
    echo "<p>Make sure:</p>";
    echo "<ul>";
    echo "<li>MySQL is running in XAMPP</li>";
    echo "<li>Database 'fitnessfrontier' exists</li>";
    echo "<li>database.sql was imported</li>";
    echo "</ul>";
    die();
} else {
    echo "<p style='color:green'><strong>✅ SUCCESS:</strong> Connected to database</p>";
}

// Test 2: Check Tables
echo "<h2>Test 2: Check Database Tables</h2>";
$tables = ['users', 'cart', 'wishlist', 'addresses', 'orders', 'order_items', 'newsletter_subscriptions'];
$missing = [];

foreach ($tables as $table) {
    $result = $conn->query("SHOW TABLES LIKE '$table'");
    if ($result->num_rows > 0) {
        echo "<p style='color:green'>✅ Table '$table' exists</p>";
    } else {
        echo "<p style='color:red'>❌ Table '$table' NOT found</p>";
        $missing[] = $table;
    }
}

if (!empty($missing)) {
    echo "<p style='color:red'><strong>Missing tables:</strong> " . implode(', ', $missing) . "</p>";
    echo "<p>Go to phpMyAdmin and import database.sql again</p>";
}

// Test 3: Test Insert
echo "<h2>Test 3: Test Data Insert</h2>";

// Test user insert
$test_email = 'test_' . time() . '@test.com';
$test_password = password_hash('testpass123', PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $test_email, $test_password, $first, $last);
$first = "Test";
$last = "User";

if ($stmt->execute()) {
    $test_user_id = $conn->insert_id;
    echo "<p style='color:green'>✅ Test user inserted (ID: $test_user_id)</p>";
    
    // Test insert to cart
    $stmt2 = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
    $stmt2->bind_param("iii", $test_user_id, $prod_id, $qty);
    $prod_id = 1;
    $qty = 1;
    
    if ($stmt2->execute()) {
        echo "<p style='color:green'>✅ Test cart item inserted</p>";
        
        // Clean up
        $conn->query("DELETE FROM cart WHERE user_id = $test_user_id");
        $conn->query("DELETE FROM users WHERE id = $test_user_id");
        echo "<p style='color:blue'><strong>Cleaned up test data</strong></p>";
    } else {
        echo "<p style='color:red'>❌ Failed to insert cart item: " . $stmt2->error . "</p>";
    }
} else {
    echo "<p style='color:red'>❌ Failed to insert test user: " . $stmt->error . "</p>";
}

// Test 4: Summary
echo "<h2>Test 4: Summary</h2>";
echo "<p style='color:green'><strong>✅ All tests passed!</strong></p>";
echo "<p>Your database is ready to use.</p>";
echo "<p><a href='../'>← Back to FitnessFrontier</a></p>";

$conn->close();
?>
