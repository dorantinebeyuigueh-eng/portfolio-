// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Smooth scroll functionality
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Make scrollToSection available globally
    window.scrollToSection = scrollToSection;

    // Add scroll animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for scroll animation
    const cards = document.querySelectorAll('.skill-card, .project-card, .experience-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add navbar scroll effect (if navbar is added later)
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scroll indicator to body
        const scrollPercent = (scrollTop / (document.body.scrollHeight - window.innerHeight)) * 100;
        document.body.style.setProperty('--scroll-percent', scrollPercent + '%');
        
        lastScrollTop = scrollTop;
    });

    // Add form validation if contact form is implemented
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You could add analytics tracking here
            console.log('Email link clicked:', this.href);
        });
    });

    // Add loading states for buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.innerHTML;
                this.classList.add('loading');
                this.innerHTML = '<span class="loading-spinner"></span>Loading...';
                
                // Simulate loading for demo purposes
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 2000);
            }
        });
    });

    // Add theme awareness (for future dark/light mode toggle)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
        // Theme handling logic would go here
        console.log('Theme preference changed:', e.matches ? 'dark' : 'light');
    }
    
    prefersDarkScheme.addEventListener('change', handleThemeChange);

    // Add performance optimizations
    // Debounce scroll events
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

    // Optimize scroll listeners
    const optimizedScrollHandler = debounce(() => {
        // Any intensive scroll operations would go here
    }, 16); // ~60fps

    window.addEventListener('scroll', optimizedScrollHandler);

    // Add accessibility enhancements
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // Add skip link functionality (if skip links are added)
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add error handling for missing elements
    try {
        // Any code that might fail gracefully
        console.log('Portfolio JavaScript initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// CSS for ripple effect and loading spinner
const style = document.createElement('style');
style.textContent = ``;
document.head.appendChild(style);

//javascript
document.getElementById('contactForm').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const error = document.getElementById('error');
  const success = document.getElementById('success');

  if (name === '' || email === '' || message === '') {
    e.preventDefault();
    error.textContent = 'Please fill in all fields.';
    success.textContent = '';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    e.preventDefault();
    error.textContent = 'Please enter a valid email.';
    success.textContent = '';
    return;
  }

  error.textContent = '';
  success.textContent = 'Message is being sent...';
});

// ...existing code...

const primaryButtons = document.querySelectorAll('.btn-primary');
primaryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Prevent multiple spinners
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            // Create spinner element
            let spinner = document.createElement('span');
            spinner.className = 'loading-spinner';
            spinner.style.display = 'inline-block';
            spinner.style.width = '16px';
            spinner.style.height = '16px';
            spinner.style.border = '2px solid #fff';
            spinner.style.borderTop = '2px solid #3498db';
            spinner.style.borderRadius = '50%';
            spinner.style.animation = 'spin 1s linear infinite';
            spinner.style.marginLeft = '8px';
            this.appendChild(spinner);
            this.disabled = true;

            // Remove spinner after 2 seconds (simulate loading)
            setTimeout(() => {
                this.classList.remove('loading');
                spinner.remove();
                this.disabled = false;
            }, 2000);
        }
    });
});

// Spinner animation CSS
//const style = document.createElement('style');
//style.textContent = `
//@keyframes spin {
//    to { transform: rotate(360deg); }
//}`;
//document.head.appendChild(style);

// ...existing code...
