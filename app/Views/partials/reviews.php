<section id="opiniones">

    <div class="opiniones-container">

        <div class="opiniones-encabezado">
            <p>OPINIONES</p>

            <h2>Lo que dicen nuestros clientes.</h2>
        </div>

        <div class="opiniones-carrusel">

            <button class="opiniones-flecha opiniones-flecha-izquierda" type="button"
                aria-label="Ver reseñas anteriores">
                ←
            </button>

            <div class="opiniones-grid">
                <?php if (!empty($googleData['reviews'])): ?>

                    <?php foreach ($googleData['reviews'] as $review): ?>

                        <?php
                        $nombre = $review['authorAttribution']['displayName'] ?? 'Cliente de Google';

                        $texto = $review['originalText']['text']
                            ?? $review['text']['text']
                            ?? null;

                        $rating = $review['rating'] ?? 0;

                        $fecha = '';

                        if (!empty($review['publishTime'])) {
                            $date = new DateTime($review['publishTime']);
                            $date->setTimezone(new DateTimeZone('Europe/Madrid'));
                            $fecha = $date->format('d/m/Y');
                        }
                        ?>

                        <article class="opinion">

                            <div class="opinion-estrellas" aria-label="<?= htmlspecialchars($rating) ?> de 5 estrellas">
                                <?= str_repeat('★', (int) $rating) ?>
                            </div>

                            <?php if ($texto): ?>
                                <p><?= htmlspecialchars($texto) ?></p>
                            <?php endif; ?>

                            <div class="opinion-autor">
                                <strong><?= htmlspecialchars($nombre) ?></strong>

                                <?php if ($fecha): ?>
                                    <span><?= htmlspecialchars($fecha) ?></span>
                                <?php endif; ?>
                            </div>

                        </article>

                    <?php endforeach; ?>

                <?php else: ?>

                    <p class="opiniones-sin-resultados">
                        No hay opiniones disponibles en este momento.
                    </p>

                <?php endif; ?>
            </div>

            <button class="opiniones-flecha opiniones-flecha-derecha" type="button" aria-label="Ver siguientes reseñas">
                →
            </button>

        </div>

        <?php if (!empty($googleData['googleMapsUri'])): ?>

            <a href="<?= htmlspecialchars($googleData['googleMapsUri']) ?>" class="opiniones-boton" target="_blank"
                rel="noopener noreferrer">
                VER TODAS LAS OPINIONES
            </a>

        <?php endif; ?>

    </div>

</section>