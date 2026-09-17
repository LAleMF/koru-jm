<?php

$services = require __DIR__ . '/../../../config/services.php';

?>

<section id="servicios" class="services">

    <div class="services-container">

        <div class="section-heading">

            <span>SERVICIOS</span>

            <h2>
                CUÍDATE.<br>
                DISFRUTA.<br>
                REPITE.
            </h2>

            <p>
                Descubre nuestros servicios de barbería y encuentra
                el estilo que mejor encaja contigo.
            </p>

        </div>


        <div class="services-layout">

            <div class="services-image">

                <img src="../../public/assets/images/gal-3.jpg" alt="Trabajo realizado en KORU JOSE MARTINEZ">

                <div class="services-image-overlay">

                    <span>KORU JM</span>

                    <p>
                        MÁS QUE UN CORTE,<br>
                        UNA EXPERIENCIA.
                    </p>

                </div>

            </div>


            <div class="services-list">

                <?php $indice = 0; ?>

                <?php foreach ($services as $categoria => $items): ?>

                    <?php
                    $categoryId = 'service-panel-' . $indice;
                    $isOpen = $indice === 0;
                    ?>

                    <div class="service-category <?= $isOpen ? 'is-open' : '' ?>">

                        <button class="service-category-heading" type="button"
                            aria-expanded="<?= $isOpen ? 'true' : 'false' ?>" aria-controls="<?= $categoryId ?>">
                            <span><?= htmlspecialchars($categoria) ?></span>

                            <strong aria-hidden="true">
                                <?= $isOpen ? '−' : '+' ?>
                            </strong>
                        </button>

                        <div id="<?= $categoryId ?>" class="service-items">

                            <?php foreach ($items as $service): ?>

                                <article class="service-item">

                                    <div class="service-main">
                                        <h3><?= htmlspecialchars($service['nombre']) ?></h3>

                                        <?php if (!empty($service['descripcion'])): ?>
                                            <p><?= htmlspecialchars($service['descripcion']) ?></p>
                                        <?php endif; ?>
                                    </div>

                                    <div class="service-info">
                                        <span class="service-duration">
                                            <?= htmlspecialchars($service['duracion']) ?>
                                        </span>

                                        <span class="service-price">
                                            <?= htmlspecialchars($service['precio']) ?>
                                        </span>
                                    </div>

                                </article>

                            <?php endforeach; ?>

                        </div>

                    </div>

                    <?php $indice++; ?>

                <?php endforeach; ?>

            </div>

        </div>


        <div class="services-footer">

            <p>
                Precios y disponibilidad según Booksy.
            </p>

            <a href="https://booksy.com/es-es/183495_koru-jose-martinez_barberia_34440_santander"
                class="services-button" target="_blank" rel="noopener noreferrer">
                RESERVAR CITA
            </a>

        </div>

    </div>

</section>