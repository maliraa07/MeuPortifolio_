// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const navbarCollapse = document.getElementById('navbarNav');

// ==================== THEME TOGGLE (LIGHT/DARK) ====================
const THEME_STORAGE_KEY = 'portfolio-theme';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        }
    }
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active nav link on scroll
    let current = '';
    const sections = Array.from(navLinks)
        .map(link => link.getAttribute('href'))
        .filter(href => href && href.startsWith('#'))
        .map(href => document.querySelector(href))
        .filter(Boolean);

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu only when navbar links are clicked
if (navbar && navbarCollapse) {
    const mobileNavLinks = navbar.querySelectorAll('.nav-link[href^="#"]');

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                if (window.bootstrap && window.bootstrap.Collapse) {
                    const collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                    collapseInstance.hide();
                } else {
                    // Fallback if Bootstrap global is not available
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// ==================== TYPING EFFECT ====================
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Maria Fernanda Silva Lira',
    'Analista de TI Junior',
    'Desenvolvedora Front-End',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingDelay = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 500;
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ==================== AOS INITIALIZATION ====================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ==================== SKILL PROGRESS BARS ANIMATION ====================
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => observer.observe(bar));
};

window.addEventListener('load', animateProgressBars);

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Show loading message
        formMessage.innerHTML = '<div class="alert alert-info"><i class="bi bi-hourglass-split me-2"></i>Enviando mensagem...</div>';
        formMessage.style.display = 'block';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            formMessage.innerHTML = '<div class="alert alert-success"><i class="bi bi-check-circle me-2"></i>Mensagem enviada com sucesso! Entrarei em contato em breve.</div>';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
            // In production, you would send the data to your backend:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ nome, email, assunto, mensagem })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     formMessage.innerHTML = '<div class="alert alert-success">Mensagem enviada com sucesso!</div>';
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     formMessage.innerHTML = '<div class="alert alert-danger">Erro ao enviar mensagem. Tente novamente.</div>';
            // });
        }, 1500);
    });
}

// ==================== CARD HOVER EFFECTS ====================
const skillCards = document.querySelectorAll('.skill-category-card');
const projectCards = document.querySelectorAll('.project-card');

// Add tilt effect on mouse move
skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== PARTICLE ANIMATION (Optional Enhancement) ====================
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(168, 85, 247, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '-10px';
    particle.style.zIndex = '1';
    particle.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Add particle animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically (optional, can be disabled)
// setInterval(createParticle, 300);

// ==================== FORM VALIDATION ENHANCEMENT ====================
const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
        }
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('is-valid') && input.value.trim() === '') {
            input.classList.remove('is-valid');
        }
    });
});

// ==================== LAZY LOADING FOR IMAGES (if you add real images later) ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c👩‍💻 Maria Fernanda Silva Lira', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('%cInteressado em trabalhar comigo? Entre em contato!', 'color: #94a3b8; font-size: 14px;');

