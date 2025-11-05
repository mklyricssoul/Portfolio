// ==================== PORTFOLIO JAVASCRIPT ==================== //

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== VARIABLES ==================== //
    const navbar = document.querySelector('.futuristic-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const skillBars = document.querySelectorAll('.skill-progress');
    const typingText = document.querySelector('.typing-text');
    const contactForm = document.querySelector('.contact-form');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // ==================== NAVBAR FUNCTIONALITY ==================== //
    
    // Add scrolled class to navbar on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === #${sectionId}) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll to section on nav link click
    function handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
    
    // Attach event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // ==================== TYPING ANIMATION ==================== //
    function initTypingAnimation() {
        if (!typingText) return;
        
        const text = typingText.getAttribute('data-text') || 'Hi, I\'m RAGU PATHI';
        const speed = 100;
        let i = 0;
        
        typingText.innerHTML = '';
        
        function typeWriter() {
            if (i < text.length) {
                typingText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // ==================== SKILL BARS ANIMATION ==================== //
    function animateSkillBars() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target.querySelector('.skill-progress');
                    const percent = skillBar.style.width;
                    
                    // Reset width and animate
                    skillBar.style.width = '0%';
                    setTimeout(() => {
                        skillBar.style.width = percent;
                        skillBar.style.transition = 'width 2s ease-out';
                    }, 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
    }
    
    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== //
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll([
            '.hero-content',
            '.profile-container',
            '.about-content',
            '.timeline-item',
            '.skill-category',
            '.project-card',
            '.contact-info',
            '.contact-form',
            '.tech-icon'
        ].join(','));
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.8s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Initially hide elements
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        });
        
        // Observe elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ==================== CONTACT FORM HANDLING ==================== //
    function handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    // ==================== NOTIFICATION SYSTEM ==================== //
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = notification notification-${type};
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 212, 255, 0.1)'};
            border: 1px solid ${type === 'success' ? '#00ff88' : '#00d4ff'};
            border-radius: 10px;
            padding: 1rem 1.5rem;
            color: white;
            backdrop-filter: blur(10px);
            z-index: 9999;
            min-width: 300px;
            animation: slideInFromRight 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutToRight 0.5s ease-out';
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }
    
    // Add notification animations to CSS dynamically
    const notificationStyles = `
        @keyframes slideInFromRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutToRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 0;
            margin-left: 1rem;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
        }
        
        .notification {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = notificationStyles;
        document.head.appendChild(style);
    }
    
    // ==================== PARTICLE SYSTEM ENHANCEMENT ==================== //
    function enhanceParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            // Add random movement
            const randomDelay = Math.random() * 2;
            const randomDuration = 8 + Math.random() * 4;
            
            particle.style.animationDelay = ${randomDelay}s;
            particle.style.animationDuration = ${randomDuration}s;
            
            // Add glow effect
            particle.style.boxShadow = 0 0 10px rgba(0, 212, 255, 0.8);
        });
    }
    
    // ==================== SCROLL INDICATOR ==================== //
    function handleScrollIndicator() {
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    }
    
    // ==================== MOBILE OPTIMIZATION ==================== //
    function optimizeForMobile() {
        // Detect mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Reduce animation intensity on mobile
            document.body.classList.add('mobile-device');
            
            // Optimize touch interactions
            document.querySelectorAll('.futuristic-btn, .futuristic-btn-outline, .project-card, .tech-icon').forEach(element => {
                element.style.transition = 'all 0.2s ease';
            });
        }
    }
    
    // ==================== PERFORMANCE OPTIMIZATION ==================== //
    function optimizePerformance() {
        // Throttle scroll events
        let ticking = false;
        
        function updateScrollEffects() {
            handleNavbarScroll();
            updateActiveNavLink();
            handleScrollIndicator();
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // ==================== THEME CUSTOMIZATION ==================== //
    function initThemeCustomization() {
        // Check for user's preferred color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            // User prefers light mode - could add light theme here
            console.log('User prefers light mode');
        }
        
        // Listen for changes in color scheme preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                console.log('Switched to dark mode');
            } else {
                console.log('Switched to light mode');
            }
        });
    }
    
    // ==================== EASTER EGG ==================== //
    function addEasterEgg() {
        let konami = [];
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        
        document.addEventListener('keydown', function(e) {
            konami.push(e.keyCode);
            
            if (konami.length > konamiCode.length) {
                konami.shift();
            }
            
            if (konami.join(',') === konamiCode.join(',')) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s infinite';
                showNotification('🎉 Easter egg found! You\'re awesome!', 'success');
                
                // Add rainbow animation
                const rainbowStyles = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                
                const style = document.createElement('style');
                style.textContent = rainbowStyles;
                document.head.appendChild(style);
                
                setTimeout(() => {
                    document.body.style.animation = '';
                    style.remove();
                }, 4000);
                
                konami = [];
            }
        });
    }
    
    // ==================== INITIALIZATION ==================== //
    function init() {
        // Initialize all functionality
        initTypingAnimation();
        animateSkillBars();
        initScrollAnimations();
        enhanceParticles();
        optimizeForMobile();
        optimizePerformance();
        initThemeCustomization();
        addEasterEgg();
        
        // Attach form event listener
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
        
        // Add click handler for scroll indicator
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
        
        // Initialize AOS (Animate On Scroll) alternative
        setTimeout(() => {
            document.querySelectorAll('[data-aos]').forEach(element => {
                element.classList.add('aos-animate');
            });
        }, 500);
        
        console.log('🚀 Portfolio initialized successfully!');
    }
    
    // ==================== UTILITY FUNCTIONS ==================== //
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Smooth scroll polyfill for older browsers
    function smoothScrollPolyfill() {
        if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js';
            document.head.appendChild(script);
        }
    }
    
    // ==================== ERROR HANDLING ==================== //
    window.addEventListener('error', function(e) {
        console.error('Portfolio Error:', e.error);
        // Could send error to analytics service here
    });
    
    // ==================== FINAL INITIALIZATION ==================== //
    try {
        init();
        smoothScrollPolyfill();
    } catch (error) {
        console.error('Failed to initialize portfolio:', error);
        // Fallback initialization
        document.body.classList.add('no-js');
    }
    
    // ==================== EXPORT FOR TESTING ==================== //
    window.PortfolioApp = {
        showNotification,
        debounce,
        throttle,
        isInViewport
    };
});

// ==================== GLOBAL EVENT LISTENERS ==================== //

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate animations on resize
    console.log('Window resized, recalculating layouts...');
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Connection restored');
    if (window.PortfolioApp) {
        window.PortfolioApp.showNotification('Connection restored!', 'success');
    }
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    if (window.PortfolioApp) {
        window.PortfolioApp.showNotification('You\'re offline. Some features may not work.', 'info');
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register service worker here for offline functionality
        console.log('Service Worker support detected');
    });
}