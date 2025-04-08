// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');
const links = document.querySelectorAll('nav a');
const pageTransition = document.querySelector('.page-transition');

// Mobile Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
links.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});

// Page Transitions
function handlePageTransition(e) {
  const currentPage = window.location.href;
  const targetPage = e.target.href;
  
  // Only trigger for internal links
  if (targetPage && targetPage.includes(window.location.origin) && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    
    pageTransition.classList.add('entering');
    
    setTimeout(() => {
      window.location.href = targetPage;
    }, 500);
  }
}

// Add transition event to all internal links
document.querySelectorAll('a[href^="index"], a[href^="about"], a[href^="skills"], a[href^="contact"]').forEach(link => {
  link.addEventListener('click', handlePageTransition);
});

// Animate elements when they enter the viewport
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right, .scale-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = elementTop < window.innerHeight && elementBottom > 0;
    
    if (isVisible) {
      element.style.animationPlayState = 'running';
    }
  });
}

// Initialize animations
window.addEventListener('load', () => {
  // Hide page transition overlay
  pageTransition.style.transform = 'translateY(-100%)';
  
  // Start animations
  animateOnScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
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