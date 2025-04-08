// Particles.js - A lightweight JavaScript library for creating particles
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.getElementById('particles-js');
  
  if (!particlesContainer) return;
  
  // Configuration
  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.2,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  particlesContainer.appendChild(canvas);
  
  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.5;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.size > 0.2) this.size -= 0.01;
      
      // Boundary check
      if (this.x < 0 || this.x > canvas.width) {
        this.speedX = -this.speedX;
      }
      
      if (this.y < 0 || this.y > canvas.height) {
        this.speedY = -this.speedY;
      }
    }
    
    draw(ctx) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  // Initialize particles
  let particles = [];
  const initParticles = () => {
    particles = [];
    for (let i = 0; i < particlesConfig.particles.number.value; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new Particle(x, y));
    }
  };
  
  // Draw particles and connections
  const drawParticles = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw(ctx);
    });
    
    // Draw connections
    if (particlesConfig.particles.line_linked.enable) {
      const maxDistance = particlesConfig.particles.line_linked.distance;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * particlesConfig.particles.line_linked.opacity;
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = particlesConfig.particles.line_linked.width;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    requestAnimationFrame(drawParticles);
  };
  
  // Handle mouse interaction
  let mouse = {
    x: null,
    y: null,
    radius: 100
  };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  // Initialize and start animation
  initParticles();
  drawParticles();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
});