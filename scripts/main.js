// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
links.forEach(link => {
  link.addEventListener('click', (e) => {
    // Prevent default only for hash links
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      // Get the target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Scroll to the section
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Adjust for header height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
    
    // Close mobile menu if open
    if (nav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});

// Update active link based on scroll position
function updateActiveLink() {
  const scrollPosition = window.scrollY;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all links
      links.forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current section link
      const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// Animate elements when they enter the viewport
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right, .scale-in, .reveal-text');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = elementTop < window.innerHeight - 50 && elementBottom > 0;
    
    if (isVisible) {
      element.style.animationPlayState = 'running';
    }
  });
}

// Initialize animations and scroll events
window.addEventListener('load', () => {
  // Set initial active link
  updateActiveLink();
  
  // Start animations
  animateOnScroll();
  
  // Add scroll event listeners
  window.addEventListener('scroll', () => {
    updateActiveLink();
    animateOnScroll();
  });
});

// Profile image hover effect (on home page)
const profileImage = document.getElementById('profile-image');
if (profileImage) {
  const profileCircle = document.querySelector('.profile-circle');
  
  profileCircle.addEventListener('mouseenter', () => {
    profileImage.style.transform = 'scale(1.05)';
  });
  
  profileCircle.addEventListener('mouseleave', () => {
    profileImage.style.transform = 'scale(1)';
  });
}

// Animate skill bars when they come into view
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (barTop < windowHeight - 50) {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = width;
      }, 100);
    }
  });
}

// Call animateSkillBars on scroll
window.addEventListener('scroll', animateSkillBars);

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real implementation, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}
