<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $fecha = $_POST['date'];
    $hora = $_POST['hora'];
    $salon = $_POST['salon'];
    $evento = $_POST['evento'];

    // Validar datos
    if (!empty($usuario) && !empty($fecha) && !empty($hora) && !empty($salon) && !empty($evento)) {
        // Insertar en la tabla 'reservas'
        $stmt = $conn->prepare("INSERT INTO reservas (usuario, fecha, hora, salon, evento) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $usuario, $fecha, $hora, $salon, $evento);

        if ($stmt->execute()) {
            echo "Reserva guardada exitosamente.";
        } else {
            echo "Error al guardar la reserva: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Por favor, completa todos los campos.";
    }
}

$conn->close();
?>
