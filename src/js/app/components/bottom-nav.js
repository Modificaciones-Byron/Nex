class BottomNavigation {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    init() {
        this.highlightCurrentPage();
        this.setupEventListeners();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('terrazas')) return 'terrazas';
        if (path.includes('redes')) return 'contact';
        return 'home';
    }

    highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    setupEventListeners() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add loading state
                this.setLoadingState(link);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Store the target page for analytics
                const targetPage = link.dataset.page;
                if (window.Utils) {
                    window.Utils.trackEvent('Navigation', 'Bottom Nav Click', targetPage);
                }
            });
        });
    }

    setLoadingState(link) {
        const icon = link.querySelector('i');
        const originalIcon = icon.className;
        
        // Show loading spinner
        icon.className = 'fas fa-spinner fa-spin';
        
        // Reset after navigation (or timeout for safety)
        setTimeout(() => {
            icon.className = originalIcon;
        }, 2000);
    }

    // Method to update navigation from other components
    updateActivePage(page) {
        this.currentPage = page;
        this.highlightCurrentPage();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.bottomNavigation = new BottomNavigation();
});