<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo json_encode(["status" => "error", "message" => "Error de conexión"]);
  exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO membresias (empresa, nombre, apaterno, amaterno, telefono, correo, fecha_registro) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", 
  $data['empresa'], 
  $data['nombre'], 
  $data['apaterno'], 
  $data['amaterno'], 
  $data['telefono'], 
  $data['correo']
);

if ($stmt->execute()) {
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error", "message" => $conn->error]);
}

$stmt->close();
$conn->close();
?>