<?php
$google = require __DIR__ . '/../../../config/google.php';
$placeId = $google['place_id'];
?>

<section id="location">

    <div class="location-encabezado">
        <p>ENCUÉNTRANOS</p>
        <h2>Visítanos en Santander</h2>
        <p>Estamos aquí para que disfrutes de tu próxima experiencia Koru.</p>
    </div>

    <div class="location-grid">

        <div class="location-mapa">
            <iframe
                src="https://www.google.com/maps/embed/v1/place?key=<?= $googleMapsApiKey ?>&q=place_id:<?= $placeId ?>"
                loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"
                title="Ubicación de KORU JOSE MARTINEZ en Santander">
            </iframe>
        </div>

        <div class="location-informacion">

            <h3>KORU JOSE MARTINEZ</h3>

            <div class="location-direccion">
                <h4>Dirección</h4>
                <address>
                    P.º de Altamira, 264<br>
                    39006 Santander, Cantabria
                </address>
            </div>

            <div class="location-horario">
                <h4>Horario</h4>
                <p>Lunes - Viernes: 09:30 - 14:00 / 15:00 - 21:00</p>
                <p>Sábado: Consultar disponibilidad</p>
            </div>

            <div class="location-acciones">
                <a href="https://www.google.com/maps/search/?api=1&query=KORU+JOSE+MARTINEZ&query_place_id=<?= $placeId ?>"
                    target="_blank" rel="noopener noreferrer">
                    CÓMO LLEGAR
                </a>
                <a href="https://booksy.com/es-es/183495_koru-jose-martinez_barberia_34440_santander" target="_blank"
                    rel="noopener noreferrer">
                    RESERVAR CITA
                </a>
            </div>

        </div>

    </div>

</section>