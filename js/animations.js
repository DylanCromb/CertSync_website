// Animation and visual effects JavaScript

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.particleIntervals = [];
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParticleSystem();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        this.observeElements();
    }
    
    observeElements() {
        const selectors = [
            '.feature-card',
            '.path',
            '.step',
            '.pricing-card',
            '.contact-item',
            '.card'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                this.prepareElementForAnimation(el);
                this.observer.observe(el);
            });
        });
    }
    
    prepareElementForAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        this.animatedElements.add(element);
    }
    
    animateElement(element) {
        if (this.animatedElements.has(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            this.animatedElements.delete(element);
            this.observer.unobserve(element);
        }
    }
    
    setupScrollAnimations() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            this.updateParallax();
            this.updateScrollProgress();
        });
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax for particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = scrolled * speed;
            particle.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        }
    }
    
    setupParticleSystem() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Create additional particles dynamically
        this.createDynamicParticles();
        
        // Animate existing particles
        this.animateParticles();
    }
    
    createDynamicParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        // Add more particles for better effect
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            // Add random movement with cleanup tracking
            const interval = setInterval(() => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + Math.random() * 2000);

            // Store interval for cleanup
            this.particleIntervals.push(interval);
        });
    }

    // Cleanup method to prevent memory leaks
    cleanup() {
        // Clear all particle intervals
        this.particleIntervals.forEach(interval => clearInterval(interval));
        this.particleIntervals = [];

        // Disconnect all observers
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    
    setupHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.feature-card, .pricing-card, .card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });
        });
        
        // Button hover effects
        document.querySelectorAll('.btn, .cta-primary, .cta-secondary').forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.enhanceButtonHover(button);
            });
            
            button.addEventListener('mouseleave', () => {
                this.resetButtonHover(button);
            });
        });
    }
    
    enhanceCardHover(card) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        
        // Add glow effect
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #2B7FE0, #764ba2);
            border-radius: 17px;
            z-index: -1;
            opacity: 0.3;
            filter: blur(10px);
        `;
        card.style.position = 'relative';
        card.appendChild(glow);
    }
    
    resetCardHover(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
        
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.remove();
        }
    }
    
    enhanceButtonHover(button) {
        button.style.transform = 'translateY(-3px) scale(1.05)';
        button.style.boxShadow = '0 10px 30px rgba(43, 127, 224, 0.4)';
    }
    
    resetButtonHover(button) {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 4px 15px rgba(43, 127, 224, 0.3)';
    }
    
    setupLoadingAnimations() {
        // Page load animation
        window.addEventListener('load', () => {
            this.animatePageLoad();
        });
        
        // Staggered animation for feature cards
        this.staggerFeatureCards();
    }
    
    animatePageLoad() {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                hero.style.transition = 'opacity 1s ease, transform 1s ease';
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    staggerFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Utility method to create custom animations
    createCustomAnimation(element, animationType, duration = 1000) {
        const animations = {
            'fadeInUp': {
                from: { opacity: 0, transform: 'translateY(30px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
            },
            'fadeInLeft': {
                from: { opacity: 0, transform: 'translateX(-30px)' },
                to: { opacity: 1, transform: 'translateX(0)' }
            },
            'fadeInRight': {
                from: { opacity: 0, transform: 'translateX(30px)' },
                to: { opacity: 1, transform: 'translateX(0)' }
            },
            'scaleIn': {
                from: { opacity: 0, transform: 'scale(0.8)' },
                to: { opacity: 1, transform: 'scale(1)' }
            }
        };
        
        const animation = animations[animationType];
        if (!animation) return;
        
        element.style.opacity = '0';
        element.style.transform = animation.from.transform;
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = animation.to.transform;
        }, 100);
    }
    
    // Method to pause animations for users who prefer reduced motion
    respectReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable all animations
            document.querySelectorAll('*').forEach(el => {
                el.style.animationDuration = '0.01ms';
                el.style.animationIterationCount = '1';
                el.style.transitionDuration = '0.01ms';
            });
        }
    }
}

// Initialize animations when DOM is loaded
let animationController;
document.addEventListener('DOMContentLoaded', () => {
    animationController = new AnimationController();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationController) {
        animationController.cleanup();
    }
});

// Export for use in other files
window.AnimationController = AnimationController;
