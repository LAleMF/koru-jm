'use strict';

import justifiedLayout from '@skaut/justified-layout';

window.onload = inicio;

function inicio() {

    const btnMenu = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const menuItems = document.querySelectorAll(".menu a");

    btnMenu.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("menu-open");

        if (isOpen) {
            btnMenu.setAttribute("aria-expanded", "true");
            btnMenu.textContent = "✕";
        } else {
            btnMenu.setAttribute("aria-expanded", "false");
            btnMenu.textContent = "☰";
        }
    })

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            menu.classList.remove("menu-open");
            btnMenu.setAttribute("aria-expanded", "false");
            btnMenu.textContent = "☰";
        })
    })

    crearGaleria();

    let resizeTimer;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            crearGaleria();
        }, 150);
    });

}

function crearGaleria() {

    console.log("crearGaleria", window.innerWidth);

    const galeria = document.querySelector(".trabajos-grid");
    const items = document.querySelectorAll(".trabajo-item");

    if (!galeria || items.length === 0) return;

    // En móvil no hacemos absolutamente nada.
    const esMovil = window.matchMedia("(max-width: 768px)").matches;

    if (esMovil) {
        items.forEach(item => {
            item.style.width = "";
            item.style.height = "";
            item.style.left = "";
            item.style.top = "";
            item.style.position = "";
        });

        galeria.style.height = "";

        return;
    }
    // Comprobamos las imágenes
    console.log(
        [...items].map(item => {
            const img = item.querySelector("img");

            return {
                width: img.naturalWidth,
                height: img.naturalHeight
            };
        })
    );

    // En escritorio usamos Justified Layout
    const aspectRatios = [...items].map(item => {
        const img = item.querySelector("img");

        console.log("Imagen:", {
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            ratio: img.naturalWidth / img.naturalHeight
        });

        return img.naturalWidth / img.naturalHeight;
    });

    console.log("Aspect ratios:", aspectRatios);
    console.log("Ancho galería:", galeria.clientWidth);

    const geometria = justifiedLayout(aspectRatios, {
        containerWidth: galeria.clientWidth,
        targetRowHeight: 220,
        boxSpacing: 12,
        targetRowHeightTolerance: 0.25
    });

    galeria.style.height = `${geometria.containerHeight}px`;

    items.forEach((item, index) => {

        const box = geometria.boxes[index];

        item.style.width = `${box.width}px`;
        item.style.height = `${box.height}px`;
        item.style.left = `${box.left}px`;
        item.style.top = `${box.top}px`;
    });
}