// Typing Animation for Hero Section
const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');

const roles = [
    'Flutter Developer',
    'Web Developer',
    'API Integration Expert',
    'UI Designer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Wait at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
if (typingText) {
    typeText();
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    }
    
    lastScroll = currentScroll;
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert(`Thank you for your message, ${name}! I will get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Download CV Button
const downloadCV = document.getElementById('downloadCV');
if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        const cvPath = 'Muhammad-Abbas-Resume.pdf';
        // Create a temporary link to download the CV
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = cvPath;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Animation on scroll
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

// Observe elements for animation
document.querySelectorAll('.service-card, .project-card, .testimonial-card, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation to about section
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateY(30px)';
    aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(aboutContent);
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Add active class styling in CSS (will be added via style tag if needed)
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-blue) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Handle image loading
function handleImageLoad(imgElement) {
    imgElement.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    imgElement.addEventListener('error', function() {
        // If image fails to load, keep placeholder visible
        console.log('Image failed to load:', this.src);
    });
    
    // Check if image is already loaded
    if (imgElement.complete && imgElement.naturalHeight !== 0) {
        imgElement.classList.add('loaded');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Handle profile images
    const profileImg = document.getElementById('profileImg');
    const aboutImg = document.getElementById('aboutImg');
    
    if (profileImg) {
        handleImageLoad(profileImg);
    }
    
    if (aboutImg) {
        handleImageLoad(aboutImg);
    }
    
    console.log('Portfolio loaded successfully!');
});

// Prevent form from submitting on Enter key in textarea (allow multi-line)
const textarea = document.querySelector('.contact-form textarea');
if (textarea) {
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            // Ctrl+Enter to submit
            contactForm.dispatchEvent(new Event('submit'));
        }
    });
}
