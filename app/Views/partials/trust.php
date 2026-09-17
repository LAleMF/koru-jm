<section id="trust">
    <div class="trust-container">

        <article class="trust-item">
            <span class="trust-value">
                ★ <?= htmlspecialchars(number_format($googleData['rating'] ?? 0, 1, ',', '')) ?>
            </span>

            <span class="trust-label">
                Valoración en Google
            </span>
        </article>

        <article class="trust-item">
            <span class="trust-value">
                <?= htmlspecialchars($googleData['userRatingCount'] ?? 0) ?>
            </span>

            <span class="trust-label">
                Reseñas en Google
            </span>
        </article>

        <article class="trust-item">
            <span class="trust-value">
                Santander
            </span>

            <span class="trust-label">
                P.º de Altamira
            </span>
        </article>

    </div>
</section>