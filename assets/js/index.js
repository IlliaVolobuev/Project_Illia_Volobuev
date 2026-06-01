import { initAuth } from './auth.js';
import { initCart } from './cart.js';
import { initRange } from './range.js';
import { initSlider } from './slider.js';

document.addEventListener("DOMContentLoaded", () => {
  initRange();
  initSlider();
  initAuth();
  initCart();
  initMobileMenu();
});

function closeMobileMenu() {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const backdrop = document.getElementById("menu-backdrop");

  header?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Відкрити меню");
  backdrop?.setAttribute("aria-hidden", "true");
}

function initMobileMenu() {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const headerNav = document.querySelector(".header-nav");
  const backdrop = document.getElementById("menu-backdrop");

  if (!header || !menuToggle || !headerNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Закрити меню" : "Відкрити меню");
    backdrop?.setAttribute("aria-hidden", String(!isOpen));
  });

  backdrop?.addEventListener("click", closeMobileMenu);

  headerNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  headerNav.querySelectorAll(".forma-login, .basket-link").forEach((btn) => {
    btn.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) closeMobileMenu();
  });
}








document.addEventListener("DOMContentLoaded", () => {
  const sections = {
    home: document.body,
    catalog: document.querySelector("#catalog"),
    map: document.querySelector("#map"),
    footer: document.querySelector("#footer"),
  };

  const navLinks = {
    home: document.querySelector("#nav-home"),
    catalog: document.querySelector("#nav-catalog"),
    map: document.querySelector("#nav-map"),
    footer: document.querySelector("#nav-footer"),
  };

  function getCurrentSection() {
    const scrollY = window.scrollY + 200; // зміщення на висоту хедера

    let current = "home";

    for (const key in sections) {
      const section = sections[key];
      if (section.offsetTop <= scrollY) {
        current = key;
      }
    }

    return current;
  }

  function updateActiveLink() {
    const current = getCurrentSection();

    for (const key in navLinks) {
      navLinks[key].classList.remove("active-link");
    }

    navLinks[current].classList.add("active-link");
  }

  window.addEventListener("scroll", updateActiveLink);
});

























const sortSelect = document.querySelector(".sort-select");
const sortCurrent = document.getElementById("sort-current");
const sortOptions = document.querySelector(".sort-options");
const productContainer = document.querySelector(".products-grid");
const products = Array.from(document.querySelectorAll(".product-card"));

// Показати/сховати список
sortSelect.addEventListener("click", () => {
  sortOptions.classList.toggle("hidden");
});

// Функція для сортування
function sortProducts(method) {
  let sorted;

  switch (method) {
    case "az":
      sorted = [...products].sort((a, b) => {
        const titleA = a.querySelector(".product-title").textContent.trim();
        const titleB = b.querySelector(".product-title").textContent.trim();
        return titleA.localeCompare(titleB, 'uk');
      });
      break;

    case "price":
      sorted = [...products].sort((a, b) => {
        const priceA = parseInt(a.querySelector(".product-price").textContent);
        const priceB = parseInt(b.querySelector(".product-price").textContent);
        return priceA - priceB;
      });
      break;

    case "default":
    default:
      sorted = products; // повертаємось до початкового порядку
      break;
  }

  // Перемістити елементи в DOM
  productContainer.innerHTML = "";
  sorted.forEach(product => productContainer.appendChild(product));
}

// Вибір опції сортування
sortOptions.querySelectorAll("li").forEach(option => {
  option.addEventListener("click", (e) => {
    const sortType = option.dataset.sort;
    const text = option.textContent;
    sortCurrent.textContent = text;
    sortOptions.classList.add("hidden");
    sortProducts(sortType);
  });
});
