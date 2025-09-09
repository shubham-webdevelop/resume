// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => {
  if(getComputedStyle(navLinks).display === 'none'){
    navLinks.style.display = 'flex';
  } else {
    navLinks.style.display = 'none';
  }
});

// Highlight active link
const sections = document.querySelectorAll('section, header.hero');
const links = document.querySelectorAll('.nav-links a');
const map = new Map();
sections.forEach(s => {
  const id = s.getAttribute('id') || 'home';
  map.set(id, s);
});
window.addEventListener('scroll', () => {
  let current = 'home';
  map.forEach((el, id) => {
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight * 0.3) current = id;
  });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
});

// Fake form handler
function submitForm(e){
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const status = document.getElementById('formStatus');
  status.textContent = 'Sending…';
  setTimeout(() => {
    status.textContent = `Thanks, ${data.name}! I will get back to you at ${data.email}.`;
    form.reset();
  }, 600);
}

document.getElementById('year').textContent = new Date().getFullYear();
