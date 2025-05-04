<?php
include 'db_connection.php'; //archivo para la conexión a la base de datos

header('Content-Type: application/json');

$result = $conn->query("SELECT * FROM eventos");
$events = [];

while ($row = $result->fetch_assoc()) {
    $events[] = $row;
}

echo json_encode($events);

$conn->close();
?>
