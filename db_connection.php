<?php
$host = 'localhost'; // Cambia si tu host es diferente
$user = 'root'; // Usuario de la base de datos
$password = ''; // Contraseña de la base de datos
$database = 'calendario'; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $user, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
