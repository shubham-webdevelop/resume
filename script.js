// ===== Network Background Animation =====
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");
let width, height, particles;

function init() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#00bcd4";
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }

  ctx.strokeStyle = "rgba(0,188,212,0.2)";
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();

// ===== Scroll Animations =====
const sections = document.querySelectorAll("section");
const progressBars = document.querySelectorAll(".progress-bar");
const navLinks = document.querySelectorAll("nav a");

function revealSections() {
  let triggerBottom = window.innerHeight * 0.85;
  sections.forEach(sec => {
    let boxTop = sec.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      sec.classList.add("show");
    }
  });
}

function animateSkills() {
  progressBars.forEach(bar => {
    let rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      bar.style.width = bar.getAttribute("data-skill");
    }
  });
}

function highlightNav() {
  let fromTop = window.scrollY + 100;
  navLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute("href"));
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", () => {
  revealSections();
  animateSkills();
  highlightNav();
});

revealSections();
animateSkills();
highlightNav();
