/* ============================================================
   LALIT GONJI PORTFOLIO — MAIN JS
   ============================================================ */

// ── THEME ──
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  if (html.dataset.theme === 'dark') {
    html.dataset.theme = 'light';
    if (icon) { icon.className = 'fa-solid fa-sun'; }
    localStorage.setItem('theme', 'light');
  } else {
    html.dataset.theme = 'dark';
    if (icon) { icon.className = 'fa-solid fa-moon'; }
    localStorage.setItem('theme', 'dark');
  }
}

// Persist theme across pages
(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = saved;
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = saved === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
})();

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ── SCROLL TO TOP ──
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── CONTACT FORM ──
function submitForm() {
  const name = document.getElementById('f-name')?.value;
  const email = document.getElementById('f-email')?.value;
  const msg = document.getElementById('f-message')?.value;
  if (!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }
  const success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
  document.getElementById('f-name').value = '';
  document.getElementById('f-email').value = '';
  if (document.getElementById('f-subject')) document.getElementById('f-subject').value = '';
  document.getElementById('f-message').value = '';
}

// ── PHOTO UPLOAD ──
function loadPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const frame = document.getElementById('photo-frame');
    if (!frame) return;
    // Replace placeholder with real image
    frame.innerHTML = `<img src="${e.target.result}" alt="Lalit Gonji" class="real-photo" style="width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:20px"/>`;
  };
  reader.readAsDataURL(file);
}

// ── PARTICLES (Hero only) ──
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.5 ? '0,217,255' : '124,58,237',
    };
  }

  function initParticles() {
    resizeCanvas();
    particles = Array.from({ length: 90 }, createParticle);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,217,255,${0.055 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(drawParticles);
  }

  initParticles();
  drawParticles();
  window.addEventListener('resize', initParticles);
}

// ── ACTIVE NAV LINK on scroll (index only) ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.includes('#' + current)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}, { passive: true });
