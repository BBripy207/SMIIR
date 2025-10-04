/**
 * Animation Module
 * Maneja todas las animaciones y efectos visuales
 */

class AnimationManager {
    constructor() {
        this.observedElements = new Map();
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initPageAnimations();
        this.initLoadingAnimations();
    }

    initScrollAnimations() {
        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos que deben animarse
        this.observeAnimatableElements();
    }

    observeAnimatableElements() {
        // Elementos que deben animarse al entrar en vista
        const animatableSelectors = [
            '.fade-in',
            '.slide-in-left',
            '.slide-in-right',
            '.presentation-image',
            '.video-container',
            '.nav-item',
            '.card'
        ];

        animatableSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.classList.contains('no-animate')) {
                    this.scrollObserver.observe(element);
                    element.style.opacity = '0';
                    element.style.transform = this.getInitialTransform(element);
                }
            });
        });
    }

    getInitialTransform(element) {
        if (element.classList.contains('slide-in-left')) {
            return 'translateX(-30px)';
        } else if (element.classList.contains('slide-in-right')) {
            return 'translateX(30px)';
        } else {
            return 'translateY(30px)';
        }
    }

    animateElement(element) {
        // Animar elemento cuando entra en vista
        element.style.transition = 'all 0.8s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';

        // Agregar clase para indicar que está animado
        element.classList.add('animated');

        // Dejar de observar una vez animado
        this.scrollObserver.unobserve(element);
    }

    initPageAnimations() {
        // Animaciones al cargar la página
        window.addEventListener('load', () => {
            this.animatePageLoad();
        });
    }

    animatePageLoad() {
        // Animar elementos principales al cargar
        const mainTitle = document.querySelector('.main-title');
        const subtitle = document.querySelector('.subtitle');
        const header = document.querySelector('.header');

        if (mainTitle) {
            this.animateElementWithDelay(mainTitle, 0);
        }

        if (subtitle) {
            this.animateElementWithDelay(subtitle, 200);
        }

        if (header) {
            this.animateHeaderEntry(header);
        }
    }

    animateElementWithDelay(element, delay) {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('fade-in');
        }, delay);
    }

    animateHeaderEntry(header) {
        header.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            header.style.transition = 'transform 0.5s ease-out';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    initLoadingAnimations() {
        // Animaciones de carga para contenido async
        this.setupImageLoadAnimations();
        this.setupVideoLoadAnimations();
    }

    setupImageLoadAnimations() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.transition = 'opacity 0.3s ease';
                    img.style.opacity = '1';
                });
            }
        });
    }

    setupVideoLoadAnimations() {
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.style.opacity = '0';
            iframe.addEventListener('load', () => {
                iframe.style.transition = 'opacity 0.5s ease';
                iframe.style.opacity = '1';
            });
        });
    }

    // Métodos utilitarios para animaciones personalizadas
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }

    slideIn(element, direction = 'up', duration = 500) {
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };

        element.style.transform = transforms[direction];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-out`;

        requestAnimationFrame(() => {
            element.style.transform = 'translate(0, 0)';
            element.style.opacity = '1';
        });
    }

    // Cleanup method
    destroy() {
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
    }
}

export default AnimationManager;