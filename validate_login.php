<?php
session_start();

// Credenciales de ejemplo
$valid_username = "admi";
$valid_password = "123";

// Obtener datos del formulario
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Validar credenciales
if ($username === $valid_username && $password === $valid_password) {
    // Guardar sesión del usuario
    $_SESSION['loggedin'] = true;
    $_SESSION['username'] = $username;

    // Redirigir a index.html
    header("Location: index.html");
    exit();
} else {
    // Redirigir de vuelta al login con un mensaje de error
    header("Location: login.html?error=1");
    exit();
}
?>
