/**
 * Navigation Module
 * Maneja la navegación y interacciones del menú
 */

class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initSmoothScrolling();
        this.initActiveStates();
    }

    bindEvents() {
        // Event listeners para elementos de navegación
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleNavItemClick(e);
            });

            // Agregar efectos de hover con JavaScript para mejor control
            item.addEventListener('mouseenter', (e) => {
                this.onNavItemHover(e.target);
            });

            item.addEventListener('mouseleave', (e) => {
                this.onNavItemLeave(e.target);
            });
        });
    }

    handleNavItemClick(event) {
        const target = event.currentTarget;
        const href = target.getAttribute('href');

        // Si es un enlace interno, hacer scroll suave
        if (href && href.startsWith('#')) {
            event.preventDefault();
            this.scrollToSection(href);
        }

        // Marcar como activo
        this.setActiveNavItem(target);

        // Analytics o tracking (si es necesario)
        this.trackNavigation(target.textContent.trim());
    }

    onNavItemHover(element) {
        // Efectos adicionales en hover si es necesario
        element.style.transform = 'translateY(-2px)';
    }

    onNavItemLeave(element) {
        element.style.transform = 'translateY(0)';
    }

    scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setActiveNavItem(activeItem) {
        // Remover clase active de todos los items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('nav-active');
        });

        // Agregar clase active al item clickeado
        activeItem.classList.add('nav-active');
    }

    initSmoothScrolling() {
        // Habilitar smooth scrolling para todos los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initActiveStates() {
        // Detectar sección activa basada en scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id) {
                        this.updateActiveNavBasedOnSection(id);
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        // Observar todas las secciones
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavBasedOnSection(sectionId) {
        const correspondingNavItem = document.querySelector(`a[href="#${sectionId}"]`);
        if (correspondingNavItem) {
            this.setActiveNavItem(correspondingNavItem);
        }
    }

    trackNavigation(itemName) {
        // Placeholder para analytics
        console.log(`Navigation: ${itemName} clicked`);

        // Aquí podrías agregar Google Analytics, etc.
        // gtag('event', 'navigation_click', { item_name: itemName });
    }
}

export default NavigationManager;