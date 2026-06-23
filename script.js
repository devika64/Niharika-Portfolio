document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. SYSTEM VARIABLES & STATUS INITIALIZATION
     ========================================================================= */
  console.log("%cSYSTEM BOOT SEQUENCE ENGAGED // Dasari Naga Sai Niharika Portfolio", "color: #00F5FF; font-weight: bold; font-size: 14px;");
  
  const systemConsole = document.getElementById('consoleLog');
  function addConsoleLog(message, type = 'info') {
    if (!systemConsole) return;
    const time = new Date().toLocaleTimeString();
    let colorClass = 'text-secondary';
    if (type === 'success') colorClass = 'text-neon-cyan';
    if (type === 'error') colorClass = 'text-danger';
    if (type === 'warn') colorClass = 'text-neon-purple';
    
    systemConsole.innerHTML += `<br><span class="${colorClass}">[${time}] ${message}</span>`;
    systemConsole.scrollTop = systemConsole.scrollHeight;
  }

  /* =========================================================================
     2. QUANTUM PARTICLE CANVAS SIMULATION (Quantum Entanglement)
     ========================================================================= */
  const canvas = document.getElementById('quantum-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 65; // Balanced for good visual weight without lag
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: null,
      y: null,
      radius: 140
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        // Quantum phase state variables
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = Math.random() * 0.02 + 0.005;
        this.color = Math.random() > 0.5 ? '#00F5FF' : '#8B5CF6';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.phase += this.phaseSpeed;

        // Bounce from boundaries
        if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > height) this.speedY = -this.speedY;

        // Interaction with mouse (repulsion)
        if (mouse.x != null && mouse.y != null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * 1.5;
            let directionY = forceDirectionY * force * 1.5;
            this.x += directionX;
            this.y += directionY;
          }
        }
      }

      draw() {
        ctx.beginPath();
        // Pulsate radius simulating quantum oscillation
        let currentSize = this.size + Math.sin(this.phase) * 0.8;
        if (currentSize < 0.5) currentSize = 0.5;

        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for line drawings
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    // Connect close particles with entanglement line links
    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            opacityValue = 1 - distance / 120;
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacityValue * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse as well
        if (mouse.x != null && mouse.y != null) {
          let dx = particlesArray[a].x - mouse.x;
          let dy = particlesArray[a].y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            opacityValue = 1 - distance / mouse.radius;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

  /* =========================================================================
     3. TYPEWRITER EFFECT (Hero Roles)
     ========================================================================= */
  const typewriterText = document.getElementById('typewriter-text');
  const roles = [
    "Aspiring Software Engineer",
    "Quantum Computing Enthusiast",
    "Automation Developer",
    "Problem Solver"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 600; // Pause before typing next
    }

    setTimeout(typeRole, typingSpeed);
  }

  if (typewriterText) {
    typeRole();
  }

  /* =========================================================================
     4. ACTIVE SECTION TRACKING & SCROLL INDICATOR
     ========================================================================= */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbar = document.querySelector('.navbar-cyber');
  const scrollBar = document.getElementById('scrollBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    // 4.1 Update Scroll Progress Bar
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (window.scrollY / scrollHeight) * 100;
    if (scrollBar) {
      scrollBar.style.width = scrollPercentage + '%';
    }

    // 4.2 Navbar shrink effect
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 4.3 Back to Top visibility
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // 4.4 Highlight Active Navbar Segment
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

  // Smooth scroll back to top node
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================================================
     5. COUNTERS & PROGRESS CIRCLES INTERSECTION OBSERVER
     ========================================================================= */
  const countStats = document.querySelectorAll('.counter-value');
  const skillCircles = document.querySelectorAll('.skill-circle-progress');
  
  // 5.1 Stats Counter Animation
  function animateCounters() {
    countStats.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
      const duration = 1500; // 1.5 seconds duration
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing out function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const value = easeProgress * target;
        
        counter.textContent = value.toFixed(decimals);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      }
      
      requestAnimationFrame(updateCounter);
    });
  }

  // 5.2 Skills Circular Progress Ring Animation
  function animateSkillCircles() {
    skillCircles.forEach(circle => {
      const progress = parseInt(circle.getAttribute('data-progress'));
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;
      
      // Force repaint
      circle.getBoundingClientRect();
      
      const offset = circumference - (progress / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    });
  }

  // Observer Setup
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillCircles();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Bind Observers
  const aboutSection = document.getElementById('about');
  if (aboutSection && countStats.length > 0) {
    statsObserver.observe(aboutSection);
  }

  const skillsSection = document.getElementById('skills');
  if (skillsSection && skillCircles.length > 0) {
    skillsObserver.observe(skillsSection);
  }

  /* =========================================================================
     6. PROJECT CATEGORIES FILTER
     ========================================================================= */
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCols = document.querySelectorAll('.project-col');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active status on filter nodes
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      
      projectCols.forEach(col => {
        const categories = col.getAttribute('data-categories').split(' ');
        
        if (filterVal === 'all' || categories.includes(filterVal)) {
          col.classList.remove('filtered-out');
        } else {
          col.classList.add('filtered-out');
        }
      });
      
      console.log(`[PROJECT_FILTER]: Selected filter category [${filterVal.toUpperCase()}]`);
    });
  });

  /* =========================================================================
     7. SCROLL REVEAL TRIGGERS
     ========================================================================= */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================================================================
     8. TRANSCEIVER FORM INTERACTION & LOGIC
     ========================================================================= */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameField = document.getElementById('formName');
      const emailField = document.getElementById('formEmail');
      const subjectField = document.getElementById('formSubject');
      const messageField = document.getElementById('formMessage');

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const subject = subjectField.value.trim();
      const message = messageField.value.trim();

      addConsoleLog('// EXECUTION COMMAND: SUBMIT_MESSAGE_PAYLOAD', 'warn');
      addConsoleLog('[VALIDATING]: Analyzing message headers...', 'info');

      // Validation logic
      let valid = true;
      
      if (!name) {
        addConsoleLog('[ERROR]: Invalid field value in USER_NAME', 'error');
        nameField.classList.add('is-invalid');
        valid = false;
      } else {
        nameField.classList.remove('is-invalid');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        addConsoleLog('[ERROR]: Invalid format in USER_EMAIL validation schema', 'error');
        emailField.classList.add('is-invalid');
        valid = false;
      } else {
        emailField.classList.remove('is-invalid');
      }

      if (!subject) {
        addConsoleLog('[ERROR]: Missing parameters in MESSAGE_SUBJECT header', 'error');
        subjectField.classList.add('is-invalid');
        valid = false;
      } else {
        subjectField.classList.remove('is-invalid');
      }

      if (!message) {
        addConsoleLog('[ERROR]: Empty buffer detected in MESSAGE_PAYLOAD', 'error');
        messageField.classList.add('is-invalid');
        valid = false;
      } else {
        messageField.classList.remove('is-invalid');
      }

      if (!valid) {
        addConsoleLog('[TRANSMISSION_FAILED]: Validation integrity checks failed. Packets rejected.', 'error');
        return;
      }

      // Simulation of successful transmit
      addConsoleLog('[VALIDATION_PASSED]: Data packet integrity verified.', 'success');
      addConsoleLog('[TRANSMITTING]: Uploading payload to sai.niharika.dasari.work@gmail.com...', 'info');
      
      // Simulate network request delay
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'PACKETS TRANSMITTING... <i class="bi bi-broadcast"></i>';

      setTimeout(() => {
        addConsoleLog('[SYNC_COMPLETE]: Transceiver linked. Packets fully uploaded.', 'success');
        addConsoleLog('[SYS]: Connection standby active.', 'info');
        
        // Reset Form
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Transmit Data Package <i class="bi bi-send-fill ms-2"></i>';
        
        alert("Transmission Success! Thank you for contacting me.");
      }, 1500);

    });
  }

});
