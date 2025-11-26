// Utilidades globales y polyfills mejoradas

// Detectar soporte de Intersection Observer
if ('IntersectionObserver' in window === false) {
    // Polyfill para IntersectionObserver si no está disponible
    const observerPolyfill = (entries, callback) => {
        entries.forEach(entry => callback([entry]));
    };
    window.IntersectionObserver = observerPolyfill;
}

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Lazy loading para imágenes mejorado
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src || img.src;
            
            // Crear una nueva imagen para precargar
            const preloadImg = new Image();
            preloadImg.src = src;
            preloadImg.onload = () => {
                img.src = src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
            };
            
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Aplicar lazy loading a imágenes
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        // Agregar clase para transición suave
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '0';
        
        imageObserver.observe(img);
        
        // Cuando la imagen se carga, hacerla visible
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// PWA - App offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registrado correctamente'))
            .catch(error => console.log('Error al registrar SW:', error));
    });
}

// Prevenir zoom en mobile pero permitir scroll
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Mejoras de rendimiento
window.addEventListener('load', () => {
    // Preload critical resources
    const links = [
        'src/img/resource/IconsRS/iconoCompany.png',
        'src/styles/style.css',
        'src/styles/responsive.css'
    ];

    links.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        
        if (link.includes('.css')) {
            preloadLink.as = 'style';
        } else {
            preloadLink.as = 'image';
        }
        
        preloadLink.href = link;
        document.head.appendChild(preloadLink);
    });

    // Preconnect to external domains
    const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com'
    ];

    preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
    });
});

// Analytics (opcional)
const trackEvent = (category, action, label) => {
    if (window.gtag) {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    console.log(`Event: ${category} - ${action} - ${label}`);
};

// Gestión de errores global
window.addEventListener('error', (event) => {
    console.error('Error global capturado:', event.error);
    // Aquí podrías enviar el error a un servicio de monitoreo
});

// Manejo de promesas no capturadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada no capturada:', event.reason);
    event.preventDefault();
});

// Utilidad para formatear fechas
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Utilidad para truncar texto
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

// Utilidad para copiar al portapapeles
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
    }
};

// Utilidad para detectar dispositivos táctiles
const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Exportar utilidades
window.Utils = {
    trackEvent,
    imageObserver,
    formatDate,
    truncateText,
    copyToClipboard,
    isTouchDevice,
    debounce: (func, wait, immediate) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Inicializar utilidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Agregar clase touch-device si es un dispositivo táctil
    if (Utils.isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // Mejorar el rendimiento en dispositivos móviles
    if (window.innerWidth < 768) {
        // Reducir animaciones en dispositivos móviles si es necesario
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }
});