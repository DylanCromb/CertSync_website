// Animation and visual effects JavaScript

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.heroElement = document.querySelector('.hero');
        this.particlesContainer = document.querySelector('.particles');
        this.particleIntervalId = null;
        this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.prefersReducedMotion = this.reducedMotionQuery.matches;
        this.onReducedMotionChange = this.handleReducedMotionPreference.bind(this);
        this.scrollListener = null;
        this.lastKnownScrollY = window.scrollY || 0;
        this.scrollTicking = false;
        this.init();
    }

    init() {
        this.handleReducedMotionPreference();
        this.reducedMotionQuery.addEventListener('change', this.onReducedMotionChange);
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }

    handleReducedMotionPreference() {
        this.prefersReducedMotion = this.reducedMotionQuery.matches;
        document.documentElement.classList.toggle('reduced-motion', this.prefersReducedMotion);

        if (this.prefersReducedMotion) {
            this.resetHeroTransform();
            this.teardownParticleSystem();
        } else {
            this.setupParticleSystem();
        }
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
        this.scrollListener = () => {
            this.lastKnownScrollY = window.scrollY || 0;

            if (this.scrollTicking) {
                return;
            }

            this.scrollTicking = true;
            requestAnimationFrame(() => {
                this.scrollTicking = false;

                if (!this.prefersReducedMotion) {
                    this.updateParallax(this.lastKnownScrollY);
                } else {
                    this.resetHeroTransform();
                }

                this.updateScrollProgress(this.lastKnownScrollY);
            });
        };

        window.addEventListener('scroll', this.scrollListener, { passive: true });
    }

    updateParallax(scrollPosition = 0) {
        // Parallax disabled for performance
        return;
    }

    resetHeroTransform() {
        if (this.heroElement) {
            this.heroElement.style.transform = '';
        }
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
        // Particles are now static HTML elements - no dynamic creation needed
        // This improves performance significantly
        if (this.prefersReducedMotion || !this.particlesContainer) {
            return;
        }

        this.teardownParticleSystem();
    }

    createDynamicParticles(count = 0) {
        // Removed: dynamic particle creation disabled for performance
        return;
    }

    animateParticles() {
        // Removed: particle offset animation disabled for performance
        // Particles use pure CSS animation now
        return;
    }

    teardownParticleSystem() {
        if (this.particleIntervalId) {
            clearInterval(this.particleIntervalId);
            this.particleIntervalId = null;
        }

        if (!this.particlesContainer) {
            return;
        }

        this.particlesContainer.querySelectorAll('[data-dynamic="true"]').forEach((particle) => {
            particle.remove();
        });

        this.particlesContainer.querySelectorAll('.particle').forEach((particle) => {
            particle.style.removeProperty('--particle-offset-x');
            particle.style.removeProperty('--particle-offset-y');
        });
    }

    // Cleanup method to prevent memory leaks
    cleanup() {
        this.teardownParticleSystem();

        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }

        if (this.reducedMotionQuery) {
            this.reducedMotionQuery.removeEventListener('change', this.onReducedMotionChange);
        }

        if (this.observer) {
            this.observer.disconnect();
        }
    }
    
    setupHoverEffects() {
        // Enhanced hover effects for cards
        if (this.prefersReducedMotion) {
            return;
        }

        document.querySelectorAll('.feature-card, .pricing-card, .card').forEach(card => {
            card.classList.add('interactive-card');
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });
        });
        
        // Button hover effects
        document.querySelectorAll('.btn, .cta-primary, .cta-secondary').forEach(button => {
            button.classList.add('interactive-button');
            button.addEventListener('mouseenter', () => {
                this.enhanceButtonHover(button);
            });

            button.addEventListener('mouseleave', () => {
                this.resetButtonHover(button);
            });
        });
    }
    
    enhanceCardHover(card) {
        card.classList.add('is-hovered');
    }

    resetCardHover(card) {
        card.classList.remove('is-hovered');
    }

    enhanceButtonHover(button) {
        button.classList.add('is-hovered');
    }

    resetButtonHover(button) {
        button.classList.remove('is-hovered');
    }

    setupLoadingAnimations() {
        if (this.prefersReducedMotion) {
            return;
        }

        // Page load animation
        window.addEventListener('load', () => {
            this.animatePageLoad();
        }, { once: true });

        // Staggered animation for feature cards
        this.staggerFeatureCards();
    }

    animatePageLoad() {
        // Removed hero page load animation for better initial performance
        // Hero is now visible immediately on page load
        return;
    }
    
    staggerFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.setProperty('--feature-stagger', `${index * 0.1}s`);
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
    
    // Method retained for backwards compatibility
    respectReducedMotion() {
        this.handleReducedMotionPreference();
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
