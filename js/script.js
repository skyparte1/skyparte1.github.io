// Custom Cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 5 + "px";
  cursor.style.top = my - 5 + "px";
});
(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + "px";
  ring.style.top = ry - 18 + "px";
  requestAnimationFrame(animateRing);
})();

document
  .querySelectorAll("a, button, .skill-item, .projeto-card, .stack-tag")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2.5)";
      ring.style.transform = "scale(1.6)";
      ring.style.borderColor = "rgba(0,229,160,0.8)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      ring.style.transform = "scale(1)";
      ring.style.borderColor = "rgba(0,229,160,0.4)";
    });
  });

// Navbar scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Cards reveal
const cardObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 120);
        cardObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".projeto-card").forEach((c) => cardObs.observe(c));

// Counter animation
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.target === "100" ? "%" : "+";
  const start = performance.now();
  (function update(now) {
    const p = Math.min((now - start) / 1800, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  })(start);
}
const statObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll("[data-target]").forEach(animateCount);
        statObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
const statsRow = document.querySelector(".stats-row");
if (statsRow) statObs.observe(statsRow);

// 3D tilt on cards
document.querySelectorAll(".projeto-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    const rx2 = ((y - r.height / 2) / (r.height / 2)) * -5;
    const ry2 = ((x - r.width / 2) / (r.width / 2)) * 5;
    card.style.transform = `perspective(800px) rotateX(${rx2}deg) rotateY(${ry2}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
