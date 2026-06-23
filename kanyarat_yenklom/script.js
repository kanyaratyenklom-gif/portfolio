const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Language toggle (TH / EN)
const langToggle = document.getElementById("langToggle");

const applyLang = (lang) => {
  document.querySelectorAll("[data-th][data-en]").forEach((el) => {
    const text = el.getAttribute(lang === "en" ? "data-en" : "data-th");
    if (text !== null) el.textContent = text;
  });
  document.documentElement.lang = lang;
  langToggle.textContent = lang === "en" ? "TH" : "EN";
  localStorage.setItem("portfolioLang", lang);
};

const savedLang = localStorage.getItem("portfolioLang") || "th";
applyLang(savedLang);

langToggle.addEventListener("click", () => {
  const next = document.documentElement.lang === "en" ? "th" : "en";
  applyLang(next);
});

// Lightbox for certificate images
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

const openLightbox = (src) => {
  lightboxImg.src = src;
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
};

document.querySelectorAll("[data-lightbox]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openLightbox(link.getAttribute("href"));
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach((item) => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      item.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
