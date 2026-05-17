/**
 * Gaber Centers — Refined Premium Script (Final)
 * Calm · Trustworthy · Luxurious
 * Stack: GSAP + Lenis
 */

// ═══════════════════════════════════════
// 0. BASIC SETUP
// ═══════════════════════════════════════
const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ═══════════════════════════════════════
// 1. LENIS SMOOTH SCROLL
// ═══════════════════════════════════════
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 1.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ═══════════════════════════════════════
// 2. LOADER
// ═══════════════════════════════════════
const loaderTL = gsap.timeline();
loaderTL
  .from(".loader-logo", { opacity: 0, y: 30, duration: 0.9, ease: "power3.out" })
  .from(".loader-sub",  { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.4")
  .from(".loader-bar",  { opacity: 0, duration: 0.4 }, "-=0.2")
  .to(".loader-fill",   { width: "100%", duration: 1.8, ease: "power2.inOut" }, "-=0.1")
  .to("#loader", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    delay: 0.3,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
      initHero();
    },
  });

// ═══════════════════════════════════════
// 3. HERO ENTRANCE (elegant, slow)
// ═══════════════════════════════════════
function initHero() {
  const heroTL = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  heroTL
    .from(".hero-badge",   { opacity: 0, y: 24, duration: 0.8 })
    .from(".hero-title .ht1", { opacity: 0, y: 40, duration: 0.9 }, "-=0.4")
    .from(".hero-title .ht2", { opacity: 0, y: 40, duration: 0.9 }, "-=0.6")
    .from(".hero-title .ht3", { opacity: 0, y: 40, duration: 0.9 }, "-=0.6")
    .from(".hero-sub",    { opacity: 0, y: 24, duration: 0.8 }, "-=0.5")
    .from(".hero-actions", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
    .from(".hero-stats > div", {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.12
    }, "-=0.3")
    .from(".gc", {
      opacity: 0, y: 30, scale: 0.95,
      duration: 0.9, stagger: 0.15, ease: "back.out(1.4)"
    }, "-=0.8")
    .from(".scroll-ind", { opacity: 0, y: 10, duration: 0.6 }, "-=0.3");

  animateCounters(".hero-stats .sn");
}

// ═══════════════════════════════════════
// 4. CUSTOM CURSOR (subtle & disabled on mobile)
// ═══════════════════════════════════════
const cursor = document.getElementById("cursor");
const trail  = document.getElementById("cursor-trail");

if (cursor && trail && !isMobile) {
  let mouseX = 0, mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: "none" });
    gsap.to(trail,  { x: mouseX, y: mouseY, duration: 0.6, ease: "power3.out" });
  });

  const hoverEls = document.querySelectorAll("a, button, .srv-card, .ba-card, .test-card, .why-item");
  hoverEls.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 1.8, opacity: 0.4, duration: 0.3 });
      gsap.to(trail,  { scale: 2, opacity: 0.3, borderColor: "var(--cyan)", duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(trail,  { scale: 1, opacity: 1, borderColor: "rgba(125,211,252,.3)", duration: 0.3 });
    });
  });
} else if (cursor && trail) {
  cursor.style.display = "none";
  trail.style.display  = "none";
}

// ═══════════════════════════════════════
// 5. NAVBAR — hide/show on scroll
// ═══════════════════════════════════════
const nav = document.getElementById("nav");
let lastScroll = 0;
let navVisible = true;

const navObs = new IntersectionObserver(
  ([entry]) => {
    nav.classList.toggle("scrolled", !entry.isIntersecting);
  },
  { threshold: 0.1 }
);
const heroEl = document.querySelector(".hero");
if (heroEl) navObs.observe(heroEl);

lenis.on("scroll", ({ scroll }) => {
  const diff = scroll - lastScroll;
  if (diff > 6 && scroll > 200 && navVisible) {
    gsap.to(nav, { y: "-100%", duration: 0.4, ease: "power2.inOut" });
    navVisible = false;
  } else if (diff < -4 && !navVisible) {
    gsap.to(nav, { y: "0%", duration: 0.5, ease: "power2.out" });
    navVisible = true;
  }
  lastScroll = scroll;
});

// ═══════════════════════════════════════
// 6. SCROLL REVEAL (no blur, clean fade + y)
// ═══════════════════════════════════════
gsap.utils.toArray(".reveal").forEach((el) => {
  const delay = parseFloat(el.dataset.delay) || 0;
  gsap.fromTo(el,
    { opacity: 0, y: 36 },
    {
      opacity: 1, y: 0,
      duration: 0.8, delay,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
    }
  );
});

// Grid children stagger
gsap.utils.toArray(".srv-grid, .test-grid, .ba-grid, .stats-strip").forEach((grid) => {
  gsap.fromTo(grid.children,
    { opacity: 0, y: 40, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: grid, start: "top 85%", toggleActions: "play none none none" }
    }
  );
});

// ═══════════════════════════════════════
// 7. PARALLAX (mobile off)
// ═══════════════════════════════════════
if (!isMobile) {
  gsap.to(".hero-grid", {
    yPercent: 30, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".holo", {
    yPercent: 20, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5 }
  });
  gsap.to(".ecg-wrap", {
    yPercent: -15, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  document.querySelectorAll(".gc").forEach((card, i) => {
    gsap.to(card, {
      y: i % 2 === 0 ? -30 : 30, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 + i * 0.3 }
    });
  });
}

// ═══════════════════════════════════════
// 8. MOUSE PARALLAX (throttled, mobile off)
// ═══════════════════════════════════════
if (!isMobile) {
  let ticking = false, lastX = 0, lastY = 0;
  window.addEventListener("mousemove", (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!ticking) {
      requestAnimationFrame(() => {
        const W = window.innerWidth, H = window.innerHeight;
        const xR = (lastX / W - 0.5) * 2;
        const yR = (lastY / H - 0.5) * 2;
        gsap.to(".hero-bg", { backgroundPositionX: `${50 + xR * 3}%`, duration: 2, ease: "power1.out" });
        gsap.to(".hero-content", { x: xR * 6, y: yR * 4, duration: 1.8, ease: "power1.out" });
        gsap.to(".holo", { x: xR * -20, y: yR * -14, duration: 2, ease: "power1.out" });
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ═══════════════════════════════════════
// 9. MAGNETIC BUTTONS (mobile off)
// ═══════════════════════════════════════
if (!isMobile) {
  document.querySelectorAll(".btn-p, .btn-s, .nav-cta").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.2, duration: 0.4, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
    });
  });
}

// ═══════════════════════════════════════
// 10. CARD TILT (light, mobile off)
// ═══════════════════════════════════════
if (!isMobile) {
  document.querySelectorAll(".srv-card, .test-card, .ba-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: xPct * 6,
        rotateX: -yPct * 4,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power2.out" });
    });
  });
}

// ═══════════════════════════════════════
// 11. ANIMATED COUNTERS
// ═══════════════════════════════════════
function animateCounters(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    const target = parseFloat(el.getAttribute("data-counter")) || 0;
    const isK = target >= 1000;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2.2, ease: "power2.out",
      onUpdate() {
        if (isK) el.textContent = (obj.val / 1000).toFixed(obj.val < target ? 1 : 0) + "K+";
        else if (target === 98) el.textContent = Math.round(obj.val) + "%";
        else el.textContent = Math.round(obj.val) + "+";
      }
    });
  });
}

ScrollTrigger.create({
  trigger: ".stats-strip", start: "top 80%", once: true,
  onEnter: () => animateCounters(".stat-num[data-counter]"),
});

// ═══════════════════════════════════════
// 12. BEFORE/AFTER BARS
// ═══════════════════════════════════════
ScrollTrigger.create({
  trigger: ".ba-section", start: "top 70%", once: true,
  onEnter: () => {
    document.querySelectorAll("[data-target]").forEach((bar) => {
      gsap.to(bar, {
        width: bar.getAttribute("data-target"),
        duration: 1.6, ease: "power3.out",
        delay: Math.random() * 0.3
      });
    });
  },
});

// ═══════════════════════════════════════
// 13. SECTION TITLES — word by word
// ═══════════════════════════════════════
gsap.utils.toArray(".sec-title").forEach((title) => {
  const words = title.innerHTML.split(" ");
  title.innerHTML = words
    .map((w) => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word" style="display:inline-block">${w}&nbsp;</span></span>`)
    .join("");
  gsap.from(title.querySelectorAll(".word"), {
    y: "100%", opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
    scrollTrigger: { trigger: title, start: "top 88%", toggleActions: "play none none none" }
  });
});

// ═══════════════════════════════════════
// 14. ECG PULSE — subtle velocity glow
// ═══════════════════════════════════════
lenis.on("scroll", ({ velocity }) => {
  const opacity = Math.min(0.35, 0.08 + Math.abs(velocity) * 0.03);
  gsap.to(".ecg-wrap", { opacity, duration: 0.3 });
});

// ═══════════════════════════════════════
// 15. PARTICLES (reduced, mobile‑aware)
// ═══════════════════════════════════════
(function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  if (isMobile && isReducedMotion) return;
  const count = isMobile ? 8 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "p";
    const size = 1 + Math.random() * 2.5;
    p.style.cssText = `
      left:${Math.random() * 100}%;
      top:${100 + Math.random() * 20}%;
      width:${size}px; height:${size}px;
      background:${Math.random() > 0.5 ? "#7DD3FC" : "#1E90FF"};
      border-radius:50%; position:absolute;
    `;
    container.appendChild(p);
    gsap.to(p, {
      y: -(140 + Math.random() * 200),
      opacity: Math.random() * 0.7,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 8,
      ease: "none", repeat: -1,
      onRepeat() {
        gsap.set(p, { left: `${Math.random() * 100}%`, top: `${90 + Math.random() * 20}%`, y: 0, opacity: 0 });
      }
    });
  }
})();

// ═══════════════════════════════════════
// 16. WHY ITEMS
// ═══════════════════════════════════════
gsap.fromTo(".why-item", { opacity: 0, x: -30 }, {
  opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
  scrollTrigger: { trigger: ".why-list", start: "top 80%", toggleActions: "play none none none" }
});

// ═══════════════════════════════════════
// 17. CTA SECTION
// ═══════════════════════════════════════
ScrollTrigger.create({
  trigger: ".cta-section", start: "top 70%", once: true,
  onEnter: () => {
    gsap.fromTo(".cta-section h2", { opacity: 0, y: 40, scale: 0.96 }, { opacity:1, y:0, scale:1, duration:1, ease:"power3.out" });
    gsap.fromTo(".cta-section p",  { opacity: 0, y: 24 }, { opacity:1, y:0, duration:0.8, delay:0.2, ease:"power3.out" });
    gsap.fromTo(".cta-section .btn-p, .phone-btn", { opacity:0, y:20, scale:0.95 }, {
      opacity:1, y:0, scale:1, duration:0.7, delay:0.4, stagger:0.12, ease:"back.out(1.2)"
    });
  }
});

// ═══════════════════════════════════════
// 18. FOOTER
// ═══════════════════════════════════════
gsap.from("footer > *", {
  opacity: 0, y: 20, duration: 0.7, stagger: 0.1, ease: "power2.out",
  scrollTrigger: { trigger: "footer", start: "top 90%" }
});

// ═══════════════════════════════════════
// 19. KEYBOARD & ACCESSIBILITY
// ═══════════════════════════════════════
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") document.body.classList.add("keyboard-nav");
});
document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-nav");
});

// ═══════════════════════════════════════
// 20. RESIZE
// ═══════════════════════════════════════
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
});

// ═══════════════════════════════════════
// 21. REDUCED MOTION
// ═══════════════════════════════════════
if (isReducedMotion) {
  gsap.globalTimeline.timeScale(10);
  lenis.destroy();
}

// ═══════════════════════════════════════
// 22. LAZY IMAGES FADE‑IN
// ═══════════════════════════════════════
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.style.opacity = 0;
  img.style.transition = 'opacity 0.6s ease';
  img.onload = () => img.style.opacity = 1;
  if (img.complete) img.style.opacity = 1;
});

console.log(
  "%cGaber Centers%c — Refined Experience",
  "color:#7DD3FC;font-size:1.2rem;font-weight:700;font-family:serif",
  "color:#8892a4;font-size:.85rem"
);
