<?php

require_once __DIR__ . '/../app/Services/GooglePlacesService.php';

$googlePlaces = new GooglePlacesService();

$datos = $googlePlaces->obtenerDatos();

header('Content-Type: application/json; charset=utf-8');

echo json_encode(
    $datos,
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
);
