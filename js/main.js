/* ==================== CÚSPIDES - MAIN.JS ==================== */

/* ==================== CAROUSEL SYSTEM ==================== */
class CarouselSystem {
    constructor() {
        this.testimonialsCarousel = document.querySelector('.carousel-testimonials');
        this.articlesCarousel = document.querySelector('.carousel-articles');
        this.init();
    }

    init() {
        if (this.testimonialsCarousel) {
            this.setupCarousel(this.testimonialsCarousel, '.testimonial-card', 'testimonials');
        }
        if (this.articlesCarousel) {
            this.setupCarousel(this.articlesCarousel, '.article-card', 'articles');
        }
    }

    setupCarousel(carousel, itemSelector, type) {
        const items = carousel.querySelectorAll(itemSelector);
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;

        const scroll = (direction) => {
            const itemWidth = items[0].offsetWidth + 24; // 24 = gap
            const container = carousel.querySelector(type === 'testimonials' ? '.testimonials-grid' : '.articles-grid');
            
            if (direction === 'next') {
                currentIndex = Math.min(currentIndex + 1, items.length - 3);
            } else {
                currentIndex = Math.max(currentIndex - 1, 0);
            }
            
            container.scrollLeft = currentIndex * itemWidth;
        };

        if (prevBtn) prevBtn.addEventListener('click', () => scroll('prev'));
        if (nextBtn) nextBtn.addEventListener('click', () => scroll('next'));
    }
}

// ==================== CARD ACTIVE SYSTEM ====================
class CardActivationSystem {
    constructor() {
        this.experiences = document.querySelectorAll('.card-experience');
        this.team = document.querySelectorAll('.card-team');
        this.init();
    }

    init() {
        if (this.experiences.length > 0) {
            this.setupExperiences();
        }
        if (this.team.length > 0) {
            this.setupTeam();
        }
    }

    setupExperiences() {
        // Desktop: hover activation
        if (window.innerWidth > 768) {
            this.experiences.forEach((card, index) => {
                card.addEventListener('mouseenter', () => {
                    this.setActiveCard(card, this.experiences);
                });
            });
        }
        // Mobile: click activation
        else {
            this.experiences.forEach((card) => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setActiveCard(card, this.experiences);
                });
            });
        }
    }

    setupTeam() {
        // Desktop: hover activation
        if (window.innerWidth > 768) {
            this.team.forEach((card) => {
                card.addEventListener('mouseenter', () => {
                    this.setActiveCard(card, this.team);
                });
            });
        }
        // Mobile: click activation
        else {
            this.team.forEach((card) => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setActiveCard(card, this.team);
                });
            });
        }
    }

    setActiveCard(activeCard, cardGroup) {
        cardGroup.forEach((card) => {
            card.classList.remove('card-active');
            card.classList.add('card-inactive');
        });

        activeCard.classList.remove('card-inactive');
        activeCard.classList.add('card-active');
    }
}

// ==================== RESPONSIVE MENU ====================
class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav a');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggle());
            this.navLinks.forEach((link) => {
                link.addEventListener('click', () => this.close());
            });
        }

        // Cerrar menú al cambiar tamaño
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.menuToggle.classList.add('active');
        this.nav.classList.add('active');
        this.isOpen = true;
    }

    close() {
        this.menuToggle.classList.remove('active');
        this.nav.classList.remove('active');
        this.isOpen = false;
    }
}

// ==================== FAQ ACCORDION ====================
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach((item) => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                this.toggle(item);
            });
        });
    }

    toggle(item) {
        const isActive = item.classList.contains('active');

        // Cerrar todos los demás
        this.faqItems.forEach((faq) => {
            faq.classList.remove('active');
        });

        // Abrir/cerrar el actual
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// ==================== SCROLL ANIMATIONS ====================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }

    init() {
        // IntersectionObserver para animaciones al scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.elements.forEach((el) => {
            observer.observe(el);
        });
    }
}

// ==================== SMOOTH SCROLL ====================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
}

// ==================== FORM HANDLING ====================
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    handleSubmit() {
        // Obtener datos del formulario
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validar
        if (!this.validate(data)) {
            this.showError('Por favor, completa todos los campos correctamente');
            return;
        }

        // Simular envío (en producción, enviar a servidor)
        console.log('Form data:', data);
        this.showSuccess('¡Solicitud enviada! Nos pondremos en contacto pronto.');

        // Limpiar formulario
        this.form.reset();
    }

    validate(data) {
        // Email válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        // Campos requeridos
        if (!data.name || !data.email || !data.subject || !data.message) {
            return false;
        }

        return true;
    }

    showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'form-alert form-alert-success';
        alert.textContent = message;
        this.form.parentElement.insertBefore(alert, this.form);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'form-alert form-alert-error';
        alert.textContent = message;
        this.form.parentElement.insertBefore(alert, this.form);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// ==================== LAZY LOADING IMAGES ====================
class LazyLoadImages {
    constructor() {
        this.init();
    }

    init() {
        // Usar native lazy loading si está disponible
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
            img.loading = 'lazy';
        });

        // Fallback con IntersectionObserver
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach((img) => {
                imageObserver.observe(img);
            });
        }
    }
}

// ==================== UTILITY: Add CSS Alert Styles ====================
function addFormAlertStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-alert {
            padding: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
            border-radius: var(--border-radius-sm);
            animation: slideUp 0.3s ease-out;
        }

        .form-alert-success {
            background-color: #D4EDDA;
            color: #155724;
            border: 1px solid #C3E6CB;
        }

        .form-alert-error {
            background-color: #F8D7DA;
            color: #721C24;
            border: 1px solid #F5C6CB;
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistemas
    new CarouselSystem();
    new CardActivationSystem();
    new MobileMenu();
    new FAQAccordion();
    new SmoothScroll();
    new FormHandler();
    new LazyLoadImages();
    addFormAlertStyles();

    // Log para debug
    console.log('Cúspides website initialized ✓');
});

// ==================== REINICIAR CARDS AL REDIMENSIONAR ====================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinicializar sistema de cards con nuevos event listeners
        new CardActivationSystem();
    }, 250);
});

// ==================== PERFORMANCE: Request Animation Frame ====================
// Para animaciones más suaves
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Aquí iría lógica de scroll si es necesaria
            ticking = false;
        });
        ticking = true;
    }
});

// ==================== ACCESIBILIDAD: Keyboard Navigation ====================
document.addEventListener('keydown', function(e) {
    // ESC para cerrar menú móvil
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            new MobileMenu().close();
        }
    }
});

// ==================== ANALYTICS: Track Scroll Depth ====================
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        // Aquí se podría enviar a Google Analytics
    }
});
