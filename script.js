/* script.js — improved version */

// Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const isMobileView = () => window.innerWidth <= 900;

// Mobile menu toggle
const menuBtn = $('#menuBtn');
const navLinks = $('#navLinks');

function closeMobileMenu() {
  if (!navLinks) return;
  navLinks.style.display = '';
  navLinks.classList.remove('open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}
function openMobileMenu() {
  if (!navLinks) return;
  navLinks.style.display = 'flex';
  navLinks.classList.add('open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    expanded ? closeMobileMenu() : openMobileMenu();
  });

  // Close menu when clicking a link (mobile)
  $$('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (isMobileView()) closeMobileMenu();
    });
  });

  // Reset nav on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      navLinks.style.display = '';
      navLinks.classList.remove('open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }, 120);
  });
}

// Active link highlighting (IntersectionObserver)
const sections = $$('section, header.hero');
const links = $$('.nav-links a');
const linkMap = new Map();
links.forEach(a => {
  const href = a.getAttribute('href');
  if (href?.startsWith('#')) linkMap.set(href.slice(1), a);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id') || 'home';
      const link = linkMap.get(id);

      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -40% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

// Form handling
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const status = $('#formStatus');
  const btn = form.querySelector('button');

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill all fields.';
    return;
  }
  if (!validateEmail(email)) {
    status.textContent = 'Invalid email address.';
    return;
  }

  btn.disabled = true;
  status.textContent = 'Sending…';

  setTimeout(() => {
    status.textContent = `Thanks, ${name}! I’ll get back to you at ${email}.`;
    form.reset();
    btn.disabled = false;
  }, 700);
}

const contactForm = $('.modern-form');
if (contactForm) contactForm.addEventListener('submit', submitForm);

// Footer year
$('#year').textContent = new Date().getFullYear();
