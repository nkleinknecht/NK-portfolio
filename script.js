// ── STARS BACKGROUND (nav & footer) ──
(function generateStars() {
  function makeShadows(count, maxY, color) {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * maxY);
      shadows.push(`${x}px ${y}px ${color}`);
    }
    return shadows.join(', ');
  }

  // Light mode: subtle indigo dots. Dark mode: white dots.
  // We use two sets and toggle via a CSS custom property.
  const isDark = document.documentElement.dataset.theme === 'dark';

  function applyStars() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const colorS = dark ? 'rgba(255,255,255,0.55)' : 'rgba(79,70,229,0.25)';
    const colorM = dark ? 'rgba(255,255,255,0.70)' : 'rgba(79,70,229,0.35)';
    const colorL = dark ? 'rgba(200,255,0,0.80)'   : 'rgba(79,70,229,0.50)';

    document.querySelectorAll('.star-s').forEach(el => {
      el.style.boxShadow = makeShadows(350, 80, colorS);
    });
    document.querySelectorAll('.star-m').forEach(el => {
      el.style.boxShadow = makeShadows(120, 80, colorM);
    });
    document.querySelectorAll('.star-l').forEach(el => {
      el.style.boxShadow = makeShadows(60, 80, colorL);
    });
  }

  applyStars();

  // Re-apply when theme changes so colors update
  document.getElementById('themeToggle').addEventListener('change', () => {
    setTimeout(applyStars, 10);
  });
})();

// ── RESEARCH POSTER MODAL ──
const posterModal   = document.getElementById('posterModal');
const posterImg     = document.getElementById('posterImg');
const posterTitle   = document.getElementById('posterTitle');
const posterClose   = document.getElementById('posterClose');
const posterPlaceholder = document.getElementById('posterPlaceholder');

document.querySelectorAll('.research-clickable').forEach(entry => {
  const open = () => {
    const src   = entry.dataset.poster;
    const title = entry.dataset.title;

    posterTitle.textContent = title;
    posterImg.src = src;
    posterImg.style.display = 'block';
    posterPlaceholder.style.display = 'none';

    // If image fails to load, show placeholder
    posterImg.onerror = () => {
      posterImg.style.display = 'none';
      posterPlaceholder.style.display = 'flex';
    };

    posterModal.classList.add('active');
    posterModal.setAttribute('aria-hidden', 'false');
    posterClose.focus();
  };

  entry.addEventListener('click', open);
  entry.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

posterClose.addEventListener('click', () => {
  posterModal.classList.remove('active');
  posterModal.setAttribute('aria-hidden', 'true');
});

posterModal.addEventListener('click', e => {
  if (e.target === posterModal) {
    posterModal.classList.remove('active');
    posterModal.setAttribute('aria-hidden', 'true');
  }
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && posterModal.classList.contains('active')) {
    posterModal.classList.remove('active');
    posterModal.setAttribute('aria-hidden', 'true');
  }
});

// ── THEME TOGGLE ──
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
toggle.addEventListener('change', () => {
  html.dataset.theme = toggle.checked ? 'dark' : '';
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navCollapse = document.getElementById('navCollapse');

function closeMenu() {
  hamburger.classList.remove('open');
  navCollapse.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = hamburger.classList.toggle('open');
  navCollapse.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Tap anywhere outside the nav to close the menu
document.addEventListener('click', (e) => {
  if (navCollapse.classList.contains('open') && !navCollapse.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// ── EASTER EGG HEART ──
const heartBtn = document.getElementById('heartBtn');
const easterEgg = document.getElementById('easterEgg');
const easterClose = document.getElementById('easterClose');

heartBtn.addEventListener('click', () => {
  easterEgg.classList.add('active');
});
easterClose.addEventListener('click', () => {
  easterEgg.classList.remove('active');
});
easterEgg.addEventListener('click', (e) => {
  if (e.target === easterEgg) easterEgg.classList.remove('active');
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

window.addEventListener('scroll', updateNav);
updateNav();
