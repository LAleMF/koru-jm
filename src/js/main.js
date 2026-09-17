'use strict';

import justifiedLayout from '@skaut/justified-layout';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'photoswipe/style.css';

gsap.registerPlugin(ScrollTrigger);

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
    iniciarLightbox();
    iniciarAnimacionHero();
    iniciarAnimacionTrust();
    iniciarAnimacionServicios();
    iniciarAcordeonServicios();
    iniciarAnimacionGaleria();
    iniciarAnimacionNosotros();
    iniciarAnimacionOpiniones();
    iniciarCarruselOpiniones();

    let resizeTimer;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            crearGaleria();
        }, 150);
    });

}

function iniciarAnimacionHero() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const etiqueta = hero.querySelector(".hero-content span");
    const titulo = hero.querySelector(".hero-content h1");
    const descripcion = hero.querySelector(".hero-content p");
    const botones = hero.querySelector(".hero-buttons");

    const timeline = gsap.timeline();

    timeline
        .from(etiqueta, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        })
        .from(titulo, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3")
        .from(descripcion, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4")
        .from(botones, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");
}

function iniciarAnimacionTrust() {

    const trust = document.querySelector("#trust");

    if (!trust) return;

    const items = trust.querySelectorAll(".trust-item");

    gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",

        scrollTrigger: {
            trigger: trust,
            start: "top 80%",
            once: true
        }
    });
}

function iniciarAnimacionServicios() {

    const services = document.querySelector("#servicios");

    if (!services) return;

    const heading = services.querySelector(".section-heading");
    const image = services.querySelector(".services-image");
    const categories = services.querySelectorAll(".service-category");

    gsap.from(heading, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
            trigger: services,
            start: "top 75%",
            once: true
        }
    });

    gsap.from(image, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
            trigger: image,
            start: "top 80%",
            once: true
        }
    });

    gsap.from(categories, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".services-list",
            start: "top 80%",
            once: true
        }
    });

}

function iniciarAcordeonServicios() {

    const services = document.querySelector("#servicios");

    if (!services) return;

    const categories = services.querySelectorAll(".service-category");

    categories.forEach((category) => {

        const button = category.querySelector(".service-category-heading");
        const panel = category.querySelector(".service-items");
        const icon = button.querySelector("strong");

        if (!button || !panel || !icon) return;

        const isOpen = category.classList.contains("is-open");

        // Colocamos la primera categoría abierta al cargar la página
        gsap.set(panel, {
            height: isOpen ? "auto" : 0
        });

        button.addEventListener("click", () => {

            const currentlyOpen = category.classList.contains("is-open");

            // Cerramos todas las demás categorías
            categories.forEach((otherCategory) => {

                if (otherCategory === category) return;

                const otherButton =
                    otherCategory.querySelector(".service-category-heading");

                const otherPanel =
                    otherCategory.querySelector(".service-items");

                const otherIcon =
                    otherButton.querySelector("strong");

                otherCategory.classList.remove("is-open");

                otherButton.setAttribute("aria-expanded", "false");

                otherIcon.textContent = "+";

                gsap.to(otherPanel, {
                    height: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });

            });

            // Si estaba abierta, la cerramos
            if (currentlyOpen) {

                category.classList.remove("is-open");

                button.setAttribute("aria-expanded", "false");

                icon.textContent = "+";

                gsap.to(panel, {
                    height: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                });

                return;
            }

            // Si estaba cerrada, la abrimos
            category.classList.add("is-open");

            button.setAttribute("aria-expanded", "true");

            icon.textContent = "−";

            gsap.fromTo(
                panel,
                {
                    height: 0
                },
                {
                    height: "auto",
                    duration: 0.45,
                    ease: "power2.inOut",
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                }
            );

            // Animación de los servicios al aparecer
            const items = panel.querySelectorAll(".service-item");

            gsap.fromTo(
                items,
                {
                    opacity: 0,
                    y: 12
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.04,
                    delay: 0.1,
                    ease: "power2.out"
                }
            );

        });

    });

}

function iniciarAnimacionGaleria() {

    const trabajos = document.querySelector("#trabajos");

    if (!trabajos) return;

    const encabezado = trabajos.querySelector(".trabajos-encabezado");
    const items = trabajos.querySelectorAll(".trabajo-item");


    // Animación del encabezado

    gsap.from(encabezado, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",

        scrollTrigger: {
            trigger: trabajos,
            start: "top 75%",
            once: true
        }
    });


    // Animación de las fotografías

    gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",

        scrollTrigger: {
            trigger: ".trabajos-grid",
            start: "top 80%",
            once: true
        }
    });

}

function iniciarAnimacionNosotros() {

    const nosotros = document.querySelector("#nosotros");

    if (!nosotros) return;

    const imagen = nosotros.querySelector(".nosotros-imagen");
    const contenido = nosotros.querySelector(".nosotros-contenido");


    // Imagen entrando desde la izquierda

    gsap.from(imagen, {
        opacity: 0,
        x: -50,
        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
            trigger: nosotros,
            start: "top 75%",
            once: true
        }
    });


    // Contenido entrando desde la derecha

    gsap.from(contenido, {
        opacity: 0,
        x: 50,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",

        scrollTrigger: {
            trigger: nosotros,
            start: "top 75%",
            once: true
        }
    });

}

function iniciarAnimacionOpiniones() {

    const opiniones = document.querySelector("#opiniones");

    if (!opiniones) return;

    const encabezado = opiniones.querySelector(".opiniones-encabezado");
    const items = opiniones.querySelectorAll(".opinion");
    const boton = opiniones.querySelector(".opiniones-boton");


    // Animación del encabezado

    gsap.from(encabezado, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",

        scrollTrigger: {
            trigger: opiniones,
            start: "top 75%",
            once: true
        }
    });


    // Animación de las reseñas

    gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",

        scrollTrigger: {
            trigger: ".opiniones-grid",
            start: "top 80%",
            once: true
        }
    });


    // Animación del botón

    if (boton) {

        gsap.from(boton, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",

            scrollTrigger: {
                trigger: boton,
                start: "top 90%",
                once: true
            }
        });

    }

}

function iniciarCarruselOpiniones() {

    const carrusel = document.querySelector(".opiniones-grid");
    const anterior = document.querySelector(".opiniones-flecha-izquierda");
    const siguiente = document.querySelector(".opiniones-flecha-derecha");

    if (!carrusel || !anterior || !siguiente) return;

    function actualizarBotones() {

        const maxScroll = carrusel.scrollWidth - carrusel.clientWidth;

        anterior.disabled = carrusel.scrollLeft <= 0;
        siguiente.disabled = carrusel.scrollLeft >= maxScroll - 1;
    }

    siguiente.addEventListener("click", () => {

        const tarjeta = carrusel.querySelector(".opinion");

        if (!tarjeta) return;

        carrusel.scrollBy({
            left: tarjeta.offsetWidth + 20,
            behavior: "smooth"
        });
    });

    anterior.addEventListener("click", () => {

        const tarjeta = carrusel.querySelector(".opinion");

        if (!tarjeta) return;

        carrusel.scrollBy({
            left: -(tarjeta.offsetWidth + 20),
            behavior: "smooth"
        });
    });

    carrusel.addEventListener("scroll", actualizarBotones);

    window.addEventListener("resize", actualizarBotones);

    actualizarBotones();
}

function iniciarLightbox() {

    const galeria = document.querySelector("#trabajos");

    if (!galeria) return;

    const items = galeria.querySelectorAll(".trabajo-item");

    items.forEach((item) => {

        const img = item.querySelector("img");

        if (!img) return;

        item.dataset.pswpWidth = img.naturalWidth;
        item.dataset.pswpHeight = img.naturalHeight;
    });

    const lightbox = new PhotoSwipeLightbox({
        gallery: galeria,
        children: ".trabajo-item",
        pswpModule: () => import("photoswipe")
    });

    lightbox.init();
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
        item.style.position = "absolute";

    });
}