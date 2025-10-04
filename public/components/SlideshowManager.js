/**
 * Slideshow Module
 * Maneja toda la lógica del slideshow/presentación
 */

class SlideshowManager {
    constructor(totalSlides = 4) {
        this.currentSlideIndex = 1;
        this.totalSlides = totalSlides;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.indicators = document.querySelectorAll('.slide-indicator');

        this.init();
    }

    init() {
        // Inicializar slideshow si existen slides
        if (this.slides.length > 0) {
            this.showSlide(this.currentSlideIndex);
            this.bindEvents();
        }
    }

    bindEvents() {
        // Event listeners para controles del slideshow
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Event listeners para dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.currentSlide(index + 1));
        });

        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.currentSlide(index + 1));
        });

        // Controles de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    showSlide(n) {
        if (n > this.totalSlides) {
            this.currentSlideIndex = 1;
        }
        if (n < 1) {
            this.currentSlideIndex = this.totalSlides;
        }

        // Ocultar todas las slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index + 1 === this.currentSlideIndex) {
                slide.classList.add('active');
            } else if (index + 1 < this.currentSlideIndex) {
                slide.classList.add('prev');
            }
        });

        // Actualizar dots
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index + 1 === this.currentSlideIndex) {
                dot.classList.add('active');
            }
        });

        // Actualizar indicadores
        this.updateSlideIndicators();
    }

    nextSlide() {
        this.currentSlideIndex++;
        this.showSlide(this.currentSlideIndex);
    }

    prevSlide() {
        this.currentSlideIndex--;
        this.showSlide(this.currentSlideIndex);
    }

    currentSlide(n) {
        this.currentSlideIndex = n;
        this.showSlide(this.currentSlideIndex);
    }

    updateSlideIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index + 1 === this.currentSlideIndex) {
                indicator.classList.add('active');
            }
        });
    }

    // Método para auto-play (opcional)
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

export default SlideshowManager;