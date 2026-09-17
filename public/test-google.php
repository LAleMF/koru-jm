<?php

$google = require __DIR__ . '/../config/google.php';

$apiKey = $google['api_key'];
$placeId = $google['place_id'];

$url = 'https://places.googleapis.com/v1/places/' . $placeId;

$headers = [
    'Content-Type: application/json',
    'X-Goog-Api-Key: ' . $apiKey,
    'X-Goog-FieldMask: id,displayName,formattedAddress,rating,userRatingCount,reviews',
];

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_TIMEOUT => 10,
]);

$response = curl_exec($ch);

if ($response === false) {
    die('Error cURL: ' . curl_error($ch));
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

$data = json_decode($response, true);

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'http_code' => $httpCode,
    'data' => $data,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
