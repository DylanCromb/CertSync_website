// Navigation-specific JavaScript

class Navigation {
    constructor() {
        this.nav = document.querySelector('nav');
        this.navLinks = document.querySelector('.nav-links');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.isMobileMenuOpen = false;
        this.previousScrollY = window.scrollY || 0;
        this.scrollTicking = false;
        this.onScroll = null;

        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupActiveStates();
    }
    
    setupScrollEffects() {
        if (!this.nav) {
            return;
        }

        this.onScroll = () => {
            const currentScrollY = window.scrollY || 0;

            if (this.scrollTicking) {
                this.previousScrollY = currentScrollY;
                return;
            }

            this.scrollTicking = true;

            requestAnimationFrame(() => {
                this.applyScrollEffects(currentScrollY);
                this.scrollTicking = false;
                this.previousScrollY = currentScrollY;
            });
        };

        window.addEventListener('scroll', this.onScroll, { passive: true });
    }

    applyScrollEffects(currentScrollY) {
        if (!this.nav) {
            return;
        }

        if (currentScrollY > 50) {
            this.nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
            this.nav.style.background = 'rgba(255, 255, 255, 0.95)';
            this.nav.style.backdropFilter = 'blur(10px)';
        } else {
            this.nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
            this.nav.style.background = 'rgba(255, 255, 255, 1)';
            this.nav.style.backdropFilter = 'none';
        }

        if (currentScrollY > this.previousScrollY && currentScrollY > 100) {
            this.nav.style.transform = 'translateY(-100%)';
        } else {
            this.nav.style.transform = 'translateY(0)';
        }
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
                    margin-left: auto;
                    flex: 0 0 auto;
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
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    z-index: 1000;
                }
                
                .nav-links.active {
                    transform: translateX(0);
                }
                
                .nav-links a,
                .nav-links button {
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
        const industryDropdown = document.querySelector('.nav-dropdown');

        if (industryDropdown && currentPage.startsWith('/industries/')) {
            industryDropdown.classList.add('is-active');
        }
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            let hrefPath = href;

            try {
                hrefPath = new URL(href, window.location.origin).pathname;
            } catch (error) {
                hrefPath = href;
            }
            
            if (hrefPath === currentPage ||
                (currentPage === '/' && hrefPath === '/index.html') ||
                (currentPage === '/index.html' && hrefPath === '/index.html')) {
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

// Login Modal class for handling the portal selection modal
class LoginModal {
    constructor() {
        this.overlay = document.getElementById('loginModalOverlay');
        this.modal = this.overlay?.querySelector('.login-modal');
        this.closeBtn = document.getElementById('loginModalClose');
        this.trigger = document.getElementById('loginModalTrigger');
        this.previouslyFocusedElement = null;
        this.focusableElements = [];

        if (this.overlay && this.trigger) {
            this.init();
        }
    }

    init() {
        // Open modal on trigger click
        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });

        // Close on close button click
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // Close on overlay click (outside modal)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });

        // Handle tab key for focus trap
        this.overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isOpen()) {
                this.handleTabKey(e);
            }
        });
    }

    open() {
        // Store the previously focused element
        this.previouslyFocusedElement = document.activeElement;

        // Show the modal
        this.overlay.hidden = false;
        this.overlay.setAttribute('aria-hidden', 'false');
        this.trigger.setAttribute('aria-expanded', 'true');

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Update focusable elements list
        this.updateFocusableElements();

        // Focus the close button or first focusable element
        setTimeout(() => {
            if (this.closeBtn) {
                this.closeBtn.focus();
            } else if (this.focusableElements.length > 0) {
                this.focusableElements[0].focus();
            }
        }, 100);
    }

    close() {
        // Hide the modal
        this.overlay.setAttribute('aria-hidden', 'true');
        this.trigger.setAttribute('aria-expanded', 'false');

        // Unlock body scroll
        document.body.style.overflow = '';

        // Return focus to the trigger element
        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
        }

        // Hide after transition
        setTimeout(() => {
            this.overlay.hidden = true;
        }, 300);
    }

    isOpen() {
        return this.overlay.getAttribute('aria-hidden') === 'false';
    }

    updateFocusableElements() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        this.focusableElements = Array.from(
            this.modal.querySelectorAll(focusableSelectors)
        ).filter(el => el.offsetParent !== null);
    }

    handleTabKey(e) {
        if (this.focusableElements.length === 0) return;

        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new LoginModal();
});

// Export for use in other files
window.Navigation = Navigation;
window.LoginModal = LoginModal;
