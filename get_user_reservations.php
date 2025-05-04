<?php
include 'db_connection.php';

// Simular un usuario autenticado (puedes reemplazar esto con tu sistema de autenticación)
$userId = 1;

// Obtener las reservas del usuario
$stmt = $conn->prepare("SELECT titulo, fecha FROM eventos WHERE usuario_id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$reservations = [];
while ($row = $result->fetch_assoc()) {
    $reservations[] = $row;
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($reservations);
?>
