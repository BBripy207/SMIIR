// Global components loader - Carga header y footer automáticamente
class ComponentLoader {
    constructor() {
        this.init();
    }

    init() {
        this.loadHeader();
        this.loadFooter();
        this.setActiveNavigation();
    }

    loadHeader() {
        const headerHTML = `
        <header class="header">
            <div class="header-left">
                <img src="/DINERBOT-T10/assets/images/simir.png" alt="SIMIR Logo" class="header-logo">
                <div class="header-contact">
                    <a href="tel:+526145518651" class="contact-link">
                        <i class="fas fa-phone"></i>
                    </a>
                    <a href="https://wa.me/message/PGBVC2B2SREDG1" class="contact-link" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
            <nav>
                <ul class="nav-menu">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            PRODUCTOS <i class="fas fa-chevron-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/DINERBOT-T10/" class="dropdown-link" id="nav-t10">DINERBOT T10</a></li>
                            <li><a href="/DINERBOT-T10/butlerbot" class="dropdown-link" id="nav-t9">DINERBOT T9</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
        `;

        // Crear contenedor si no existe
        let headerContainer = document.getElementById('header-container');
        if (!headerContainer) {
            headerContainer = document.createElement('div');
            headerContainer.id = 'header-container';
            document.body.insertBefore(headerContainer, document.body.firstChild);
        }

        headerContainer.innerHTML = headerHTML;

        // Agregar funcionalidad al dropdown para móviles
        this.initDropdown();
    }

    initDropdown() {
        const dropdown = document.querySelector('.dropdown');
        const dropdownToggle = document.querySelector('.dropdown-toggle');

        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', function (e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }

        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    loadFooter() {
        const footerHTML = `
        <footer class="footer">
            <img src="/DINERBOT-T10/assets/images/simir.png" alt="SIMIR Logo" class="footer-logo">
            <div class="footer-contact">
                <a href="tel:+526145518651" class="contact-link">
                    <i class="fas fa-phone"></i> +52 614 551 8651
                </a>
                <a href="https://wa.me/message/PGBVC2B2SREDG1" class="contact-link" target="_blank">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
            </div>
        </footer>
        `;

        // Crear contenedor si no existe
        let footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            footerContainer = document.createElement('div');
            footerContainer.id = 'footer-container';
            document.body.appendChild(footerContainer);
        }

        footerContainer.innerHTML = footerHTML;
    }

    setActiveNavigation() {
        setTimeout(() => {
            const currentPage = window.location.pathname.split('/').pop();

            // Resetear navegación activa
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));

            // Establecer navegación activa según la página
            if (currentPage === 'index.html' || currentPage === '') {
                const t10Link = document.getElementById('nav-t10');
                if (t10Link) t10Link.classList.add('active');
            } else if (currentPage === 'butlerbot.html') {
                const t9Link = document.getElementById('nav-t9');
                if (t9Link) t9Link.classList.add('active');
            }
        }, 100);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});