<?php
include 'db_connection.php';  archivo para la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];
    $salon = $_POST['salon'];
    $title = $_POST['title'];
    $notes = $_POST['notes'];

    $stmt = $conn->prepare("INSERT INTO eventos (start_date, end_date, start_time, end_time, salon, title, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $start_date, $end_date, $start_time, $end_time, $salon, $title, $notes);

    if ($stmt->execute()) {
        echo "Reserva guardada correctamente.";
    } else {
        echo "Error al guardar la reserva: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
