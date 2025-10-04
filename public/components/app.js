/**
 * DINERBOT T10 - Main Application
 * Punto de entrada principal que orquesta todos los módulos
 */

// Importar módulos (cuando uses bundler como Webpack/Vite)
// import SlideshowManager from './components/SlideshowManager.js';
// import NavigationManager from './components/NavigationManager.js';
// import AnimationManager from './components/AnimationManager.js';

class DinerbotApp {
    constructor() {
        this.components = {};
        this.config = {
            slideshow: {
                totalSlides: 4,
                autoPlay: false,
                autoPlayInterval: 5000
            },
            animations: {
                enabled: true,
                reducedMotion: false
            },
            navigation: {
                smoothScroll: true,
                trackAnalytics: false
            }
        };

        this.init();
    }

    init() {
        // Detectar preferencias del usuario
        this.detectUserPreferences();

        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }

        // Event listeners globales
        this.bindGlobalEvents();
    }

    detectUserPreferences() {
        // Detectar preferencia de movimiento reducido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.config.animations.reducedMotion = true;
            this.config.animations.enabled = false;
        }

        // Detectar si es dispositivo móvil
        this.isMobile = window.innerWidth <= 768;

        // Detectar conexión lenta
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.config.animations.enabled = false;
            }
        }
    }

    initializeComponents() {
        try {
            // Inicializar componentes solo si existen en la página
            this.initSlideshowManager();
            this.initNavigationManager();
            this.initAnimationManager();

            // Inicializar funcionalidades adicionales
            this.initErrorHandling();
            this.initPerformanceOptimizations();

            console.log('✅ DINERBOT T10 initialized successfully');

        } catch (error) {
            console.error('❌ Error initializing DINERBOT T10:', error);
            this.handleInitializationError(error);
        }
    }

    initSlideshowManager() {
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            // this.components.slideshow = new SlideshowManager(this.config.slideshow.totalSlides);

            // Versión sin módulos ES6 (compatibilidad)
            if (typeof SlideshowManager !== 'undefined') {
                this.components.slideshow = new SlideshowManager(this.config.slideshow.totalSlides);

                if (this.config.slideshow.autoPlay) {
                    this.components.slideshow.startAutoPlay(this.config.slideshow.autoPlayInterval);
                }
            }
        }
    }

    initNavigationManager() {
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems.length > 0) {
            // this.components.navigation = new NavigationManager();

            // Versión sin módulos ES6 (compatibilidad)
            if (typeof NavigationManager !== 'undefined') {
                this.components.navigation = new NavigationManager();
            }
        }
    }

    initAnimationManager() {
        if (this.config.animations.enabled) {
            // this.components.animations = new AnimationManager();

            // Versión sin módulos ES6 (compatibilidad)
            if (typeof AnimationManager !== 'undefined') {
                this.components.animations = new AnimationManager();
            }
        }
    }

    bindGlobalEvents() {
        // Event listener para cambios de tamaño de ventana
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Event listener para cambios de orientación
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 100);
        });

        // Event listener para navegación con teclado
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeydown(e);
        });

        // Event listener para errores globales
        window.addEventListener('error', (e) => {
            this.handleGlobalError(e);
        });
    }

    handleResize() {
        const newIsMobile = window.innerWidth <= 768;

        if (newIsMobile !== this.isMobile) {
            this.isMobile = newIsMobile;
            this.onBreakpointChange();
        }

        // Notificar a componentes sobre el resize
        Object.values(this.components).forEach(component => {
            if (component.onResize && typeof component.onResize === 'function') {
                component.onResize();
            }
        });
    }

    onBreakpointChange() {
        console.log(`📱 Breakpoint changed to: ${this.isMobile ? 'mobile' : 'desktop'}`);

        // Reajustar componentes según el breakpoint
        if (this.components.slideshow && this.isMobile) {
            this.components.slideshow.stopAutoPlay();
        }
    }

    handleGlobalKeydown(event) {
        // Atajos de teclado globales
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'k':
                    event.preventDefault();
                    // Aquí podrías abrir un buscador o menú de comandos
                    break;
            }
        }

        // Escape para cerrar modales, etc.
        if (event.key === 'Escape') {
            this.closeAllModals();
        }
    }

    handleGlobalError(event) {
        console.error('Global error:', event.error);

        // Aquí podrías enviar errores a un servicio de monitoreo
        // this.sendErrorToMonitoring(event.error);
    }

    initErrorHandling() {
        // Manejo de errores de promesas no capturadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            event.preventDefault();
        });
    }

    initPerformanceOptimizations() {
        // Lazy loading de imágenes
        if ('IntersectionObserver' in window) {
            this.initLazyLoading();
        }

        // Preload de recursos críticos
        this.preloadCriticalResources();
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Precargar fuentes críticas
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    closeAllModals() {
        // Cerrar todos los modales abiertos
        document.querySelectorAll('.modal.open').forEach(modal => {
            modal.classList.remove('open');
        });
    }

    handleInitializationError(error) {
        // Mostrar mensaje de error al usuario de forma elegante
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        errorContainer.innerHTML = `
            <p>⚠️ Hubo un problema al cargar la aplicación.</p>
            <button onclick="location.reload()">Recargar página</button>
        `;

        document.body.appendChild(errorContainer);
    }

    // Utility function - debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API methods
    getComponent(name) {
        return this.components[name];
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    // Cleanup method
    destroy() {
        Object.values(this.components).forEach(component => {
            if (component.destroy && typeof component.destroy === 'function') {
                component.destroy();
            }
        });

        this.components = {};
    }
}

// Inicializar la aplicación
const dinerbotApp = new DinerbotApp();

// Hacer disponible globalmente para debugging
window.DinerbotApp = dinerbotApp;