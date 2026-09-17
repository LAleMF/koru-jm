<?php
require_once '../../config/config.php';
require_once '../../app/Services/GooglePlacesService.php';

// Obtenemos los datos de Google una sola vez.
// El servicio se encarga de utilizar el caché cuando corresponde.
$googlePlaces = new GooglePlacesService();
$googleData = $googlePlaces->obtenerDatos();
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Koru JM</title>
    <link rel="stylesheet" href="../../public/assets/css/style.css">
    <link rel="stylesheet" href="../../public/build/assets/main.css">
    <script type="module" src="../../public/build/main.js"></script>
</head>

<body>
    <?php include 'partials/header.php'; ?>
    <?php include 'partials/hero.php'; ?>
    <?php include 'partials/trust.php'; ?>
    <?php include 'partials/services.php'; ?>
    <?php include 'partials/gallery.php'; ?>
    <?php include 'partials/about.php'; ?>
    <?php include 'partials/reviews.php'; ?>
    <?php include 'partials/location.php'; ?>
    <?php include 'partials/footer.php'; ?>
</body>

</html>