// Navigation-specific JavaScript

class Navigation {
    constructor() {
        this.nav = document.querySelector('nav');
        this.navLinks = document.querySelector('.nav-links');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.isMobileMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupActiveStates();
    }
    
    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add shadow when scrolled
            if (currentScrollY > 50) {
                this.nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
                this.nav.style.background = 'rgba(255, 255, 255, 0.95)';
                this.nav.style.backdropFilter = 'blur(10px)';
            } else {
                this.nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
                this.nav.style.background = 'rgba(255, 255, 255, 1)';
                this.nav.style.backdropFilter = 'none';
            }
            
            // Hide/show nav on scroll (optional)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                this.nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                this.nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (this.isMobileMenuOpen) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }
    
    setupMobileMenu() {
        // Create mobile menu toggle if it doesn't exist
        if (!this.mobileMenuToggle) {
            this.createMobileMenuToggle();
        }
        
        // Toggle mobile menu
        this.mobileMenuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !this.nav.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    createMobileMenuToggle() {
        this.mobileMenuToggle = document.createElement('button');
        this.mobileMenuToggle.className = 'mobile-menu-toggle';
        this.mobileMenuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        this.mobileMenuToggle.style.cssText = `
            display: none;
            flex-direction: column;
            justify-content: space-around;
            width: 30px;
            height: 30px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
        `;
        
        // Style the hamburger lines
        const spans = this.mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.cssText = `
                width: 100%;
                height: 3px;
                background: #333;
                border-radius: 2px;
                transition: all 0.3s ease;
            `;
        });
        
        this.nav.querySelector('.nav-container').appendChild(this.mobileMenuToggle);
        
        // Add mobile styles
        this.addMobileStyles();
    }
    
    addMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: flex !important;
                }
                
                .nav-links {
                    position: fixed;
                    top: 70px;
                    left: 0;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 2rem 0;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    z-index: 1000;
                }
                
                .nav-links.active {
                    transform: translateX(0);
                }
                
                .nav-links a {
                    margin: 1rem 0;
                    font-size: 1.2rem;
                }
                
                .mobile-menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.isMobileMenuOpen = true;
        this.navLinks.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        this.navLinks.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupActiveStates() {
        // Highlight current page in navigation
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href === currentPage || 
                (currentPage === '/' && href === 'index.html') ||
                (currentPage === '/index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Method to update navigation based on scroll position
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// Export for use in other files
window.Navigation = Navigation;
