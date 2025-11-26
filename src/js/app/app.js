// Datos actualizados y mejorados
const modsData = [
    {
        id: 1,
        title: 'Dragon Ball Z',
        date: '15/06/2024',
        status: 'Proyecto Rechazado',
        category: 'juego',
        image: 'src/img/resource/Mods/db.jpg',
        link: 'src/page/System/prx.html',
        description: 'Personajes y habilidades de DBZ',
        downloads: 0,
        rating: 0,
        featured: false
    },
    {
        id: 2,
        title: 'New World 2',
        date: '03/05/2023',
        status: 'Disponible',
        category: 'juego',
        image: 'src/img/resource/Mods/newworld.png',
        link: 'https://drive.google.com/file/d/1yPFCEQdn7CMQkDjYQB9g5AiDPr1s5iyY/view?usp=drive_link',
        description: 'Terrza e Iconos nuevos',
        downloads: 1870,
        rating: 4.6,
        featured: false
    },
    {
        id: 3,
        title: 'Sunny Day',
        date: '01/01/2023',
        status: 'Disponible',
        category: 'juego',
        image: 'src/img/resource/Mods/snd.png',
        link: 'https://drive.google.com/file/d/1MGK3UnfANfx2zxTwjGIOqeKswMbUg5JH/view?usp=drive_link',
        description: 'Clima y ambiente Sunny',
        downloads: 3210,
        rating: 4.9,
        featured: false
    },
    {
        id: 4,
        title: 'Navidad Edition',
        date: '01/12/2022',
        status: 'Disponible',
        category: 'juego',
        image: 'src/img/resource/Mods/nvd1.png',
        link: 'https://drive.google.com/file/d/1F3LHPEpEKR8R5_w5zcD3qAep6youfHpY/view?usp=sharing',
        description: 'Tema navideño especial',
        downloads: 2980,
        rating: 4.7,
        featured: true
    }
];

class App {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.hideLoadingScreen();
        this.renderMods();
        this.checkTheme();
        this.securityFeatures();
        this.animateStats();
        this.setupScrollEffects();
    }

    setupEventListeners() {
        // Theme toggle
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const sidebarClose = document.getElementById('sidebarClose');
        
        if (hamburger && sidebar) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                sidebar.classList.toggle('active');
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            });
        }

        if (sidebarClose) {
            sidebarClose.addEventListener('click', () => {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close sidebar when clicking on links
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.renderMods();
            });
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href.includes('calculadora')) {
                    e.preventDefault();
                    this.showNotification('Calculadora en desarrollo', 'info');
                    return;
                }
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Modal close
        const closeBtn = document.querySelector('.close');
        const modal = document.getElementById('contactModal');
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showNotification('¡Gracias por suscribirte!', 'success');
                newsletterForm.reset();
            });
        }
    }

    setupScrollEffects() {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const backToTop = document.getElementById('backToTop');
            
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                backToTop.classList.add('visible');
            } else {
                header.classList.remove('scrolled');
                backToTop.classList.remove('visible');
            }

            // Animate elements on scroll
            this.animateOnScroll();
        });
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.card, .feature-card, .stat-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        this.updateThemeIcon();
    }

    checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeBtn = document.getElementById('themeBtn');
        const icon = themeBtn?.querySelector('.theme-icon i');
        if (icon) {
            icon.className = document.body.classList.contains('light-mode') ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    renderMods() {
        const grid = document.querySelector('.cards-grid');
        if (!grid) return;

        // Filter mods
        let filteredMods = modsData;
        if (this.currentFilter !== 'all') {
            filteredMods = modsData.filter(mod => mod.category === this.currentFilter);
        }

        grid.innerHTML = filteredMods.map(mod => this.createCard(mod)).join('');

        // Add animations
        const cards = grid.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    createCard(mod) {
        const statusHTML = mod.status ? `<div class="card-badge">${mod.status}</div>` : '';
        const btnText = mod.link && mod.link !== '#' ? 'Descargar' : 'No disponible';
        const btnClass = mod.link && mod.link !== '#' ? 'download-btn' : 'download-btn disabled';
        const btnDisabled = !mod.link || mod.link === '#' ? 'disabled' : '';
        const featuredHTML = mod.featured ? '<div class="card-badge" style="right: auto; left: 1rem; background: var(--accent-color);">Destacado</div>' : '';
        
        // Verificar si es un enlace a prx.html
        const isPrxLink = mod.link && mod.link.includes('prx.html');
        const target = isPrxLink ? '' : 'target="_blank"';
        const onclick = isPrxLink ? `onclick="event.preventDefault(); window.loadPrxContent('${mod.link}');"` : '';
    
        return `
            <div class="card" data-category="${mod.category}">
                ${featuredHTML}
                ${statusHTML}
                <img src="${mod.image}" alt="${mod.title}" class="card-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPklNQUdFTiBOT1QgQVZBTExBQkxFPC90ZXh0Pjwvc3ZnPg=='">
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${mod.title}</h3>
                        <span class="card-category">${mod.category}</span>
                    </div>
                    <p class="card-date">
                        <i class="far fa-calendar"></i> ${mod.date}
                    </p>
                    <p class="card-description">${mod.description}</p>
                    <div class="card-stats">
                        <span class="card-stat">
                            <i class="fas fa-download"></i> ${this.formatNumber(mod.downloads)}
                        </span>
                        <span class="card-stat">
                            <i class="fas fa-star"></i> ${mod.rating}
                        </span>
                    </div>
                </div>
                <center>
                    <p>
                        <a href="src/page/instalar/instalar.html"
                        style="
                            color: #4A90E2;
                            font-weight: bold;
                            font-size: 11px;
                            text-decoration: underline;
                            text-underline-offset: 4px;
                            transition: 0.2s;
                        "
                        onmouseover="this.style.color='#357ABD'"
                        onmouseout="this.style.color='#4A90E2'"
                        >¿Cómo instalar?</a>
                    </p>
                </center>

                <div class="card-footer">
                    <a href="${mod.link}" ${btnDisabled} class="${btnClass}" ${target} ${onclick} rel="noopener">
                        <i class="fas fa-download"></i>
                        ${btnText}
                    </a>
                </div>
            </div>
        `;
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-count'));
                    this.animateValue(statNumber, 0, target, 2000);
                    observer.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.getAttribute('data-count').includes('.')) {
                element.textContent = value.toFixed(1);
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre')?.value;
        const email = document.getElementById('email')?.value;
        const mensaje = document.getElementById('mensaje')?.value;

        if (!nombre || !email || !mensaje) {
            this.showNotification('Por favor completa todos los campos', 'error');
            return;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Por favor ingresa un email válido', 'error');
            return;
        }

        // Simular envío
        this.showNotification('Enviando mensaje...', 'info');
        
        setTimeout(() => {
            this.showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
            e.target.reset();
            document.getElementById('contactModal').style.display = 'none';
        }, 2000);
    }

    showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('visible');
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Trigger initial animations
                    this.animateOnScroll();
                }, 500);
            }, 2000);
        }
    }

    securityFeatures() {
        // Prevenir inspección y acceso al código fuente
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i' || e.key === 'c')) {
                e.preventDefault();
            }
            if (e.key === 'F12') e.preventDefault();
        });

        // Prevenir drag and drop de imágenes
        document.addEventListener('dragstart', e => e.preventDefault());
        
        // Service Worker para PWA (opcional)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
        }
    }
}

// Inicializar app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Funciones globales
window.openContactForm = () => {
    document.getElementById('contactModal').style.display = 'block';
};

window.updateActiveNav = (link) => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
};

// ⭐ AGREGAR ESTA FUNCIÓN AL FINAL DE TU app.js
// ⭐ REEMPLAZA ESTA FUNCIÓN en tu app.js
window.loadPrxContent = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al cargar el contenido');
        
        const html = await response.text();
        
        // Crear un modal para mostrar el contenido
        const modal = document.createElement('div');
        modal.className = 'prx-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div class="prx-modal-content" style="
                position: relative;
                width: 100%;
                height: 100%;
                max-width: 100vw;
                max-height: 100vh;
                overflow: auto;
                background: transparent;
            ">
                <button class="prx-modal-close" style="
                    position: fixed;
                    top: 1rem;
                    right: 1rem;
                    width: 50px;
                    height: 50px;
                    border: none;
                    background: rgba(255, 0, 0, 0.8);
                    color: white;
                    font-size: 1.5rem;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 10001;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                " onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = '';">
                    <i class="fas fa-times"></i>
                </button>
                <div class="prx-modal-body" style="width: 100%; height: 100%;">
                    <iframe srcdoc="${html.replace(/"/g, '&quot;')}" 
                            style="width: 100%; height: 100%; border: none; background: #000;"
                            sandbox="allow-scripts allow-same-origin">
                    </iframe>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Cerrar modal al hacer click fuera (en el fondo negro)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Agregar evento de hover al botón de cerrar
        const closeBtn = modal.querySelector('.prx-modal-close');
        closeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(90deg) scale(1.1)';
            this.style.background = 'rgba(255, 0, 0, 1)';
        });
        closeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
            this.style.background = 'rgba(255, 0, 0, 0.8)';
        });
        
    } catch (error) {
        console.error('Error:', error);
        // Crear notificación de error
        const notification = document.createElement('div');
        notification.className = 'notification error visible';
        notification.textContent = 'Error al cargar el contenido';
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #ff4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10002;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};