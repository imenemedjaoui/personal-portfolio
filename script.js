/* ========================================
   CURSOR GLOW
   ======================================== */
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

/* ========================================
   NAVIGATION
   ======================================== */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');
const sections = document.querySelectorAll('.section, .hero');

// Scroll detection for nav background
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 50);
  lastScroll = scrollY;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
function updateActiveLink() {
  const scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

/* ========================================
   SMOOTH SCROLL (for anchor links)
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ========================================
   GSAP ANIMATIONS
   ======================================== */
gsap.registerPlugin(ScrollTrigger);

// Hero animations — staggered entrance
const heroElements = document.querySelectorAll('.hero [data-animate]');
heroElements.forEach((el) => {
  const delay = parseFloat(el.dataset.delay) || 0;
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3 + delay,
      ease: 'power3.out',
      onComplete: () => el.classList.add('animated')
    }
  );
});

// Scroll-triggered animations for all other sections
document.querySelectorAll('.section [data-animate]').forEach((el) => {
  const delay = parseFloat(el.dataset.delay) || 0;
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      },
      onComplete: () => el.classList.add('animated')
    }
  );
});

// Stat counter animation
function animateCounters() {
  document.querySelectorAll('.stat-number[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count);
    gsap.fromTo(el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 1.5,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      }
    );
  });
}
animateCounters();

// Timeline line draw animation
gsap.fromTo('.timeline::before',
  { scaleY: 0 },
  {
    scaleY: 1,
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 1
    }
  }
);

// Parallax for gradient orbs
gsap.to('.orb-1', {
  y: -100,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

gsap.to('.orb-2', {
  y: -60,
  x: 40,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

// Skill cards stagger
ScrollTrigger.batch('.skill-category', {
  onEnter: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        onComplete: () => elements.forEach(el => el.classList.add('animated'))
      }
    );
  },
  start: 'top 85%',
  once: true
});

// Work project cards stagger
ScrollTrigger.batch('.work-card', {
  onEnter: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        onComplete: () => elements.forEach(el => el.classList.add('animated'))
      }
    );
  },
  start: 'top 85%',
  once: true
});

// Project cards stagger
ScrollTrigger.batch('.project-card', {
  onEnter: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        onComplete: () => elements.forEach(el => el.classList.add('animated'))
      }
    );
  },
  start: 'top 85%',
  once: true
});

/* ========================================
   MAGNETIC HOVER EFFECT ON BUTTONS
   ======================================== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ========================================
   TILT EFFECT ON CARDS
   ======================================== */
document.querySelectorAll('.project-card, .work-card, .stat-card, .skill-category').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
