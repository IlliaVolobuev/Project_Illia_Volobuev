import { showFrame } from './showFrame.js';
import { initRange } from './range.js';
import { initSlider } from './slider.js';
import { renderPage } from './render.js'; // замість renderProducts
import { getFilteredProducts, resetFilters } from './filters.js';
import { sortProducts as sortProductsFn } from './sort.js';
import { products } from './data.js';
import { updateLogoText } from './logoSwitch.js';
import { setupBurgerMenu } from './burgerMenu.js';

let filteredProducts = [...products]; // Поточний набір товарів
let currentPage = 1;
const cardsPerPage = 6;

document.addEventListener("DOMContentLoaded", () => {
  initRange();
  initSlider();

  renderPage(currentPage, filteredProducts);

  const formaLogin = document.querySelector(".forma-login");
  formaLogin.addEventListener("click", (e) => {
    e.preventDefault();
    showFrame();
  });

  // Кнопки пагінації
  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage, filteredProducts);
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredProducts.length / cardsPerPage)) {
      currentPage++;
      renderPage(currentPage, filteredProducts);
    }
  });

  document.querySelectorAll(".page-button").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currentPage = index + 1;
      renderPage(currentPage, filteredProducts);
    });
  });

  // Фільтрація
  document.querySelector(".primary-button").addEventListener("click", () => {
    filteredProducts = getFilteredProducts();
    currentPage = 1;
    renderPage(currentPage, filteredProducts);
  });

  document.querySelector(".secondary-button").addEventListener("click", () => {
    resetFilters((resetData) => {
      filteredProducts = resetData;
      currentPage = 1;
      renderPage(currentPage, filteredProducts);
    });
  });

  setupSorting();
  setupNavigation();
});

function setupSorting() {
  const sortSelect = document.querySelector(".sort-select");
  const sortCurrent = document.getElementById("sort-current");
  const sortOptions = document.querySelector(".sort-options");

  sortSelect.addEventListener("click", () => {
    sortOptions.classList.toggle("hidden");
  });

  sortOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
      const sortType = option.dataset.sort;
      sortCurrent.textContent = option.textContent;
      sortOptions.classList.add("hidden");

      filteredProducts = getFilteredProducts();
      sortProductsFn(sortType, filteredProducts);
      currentPage = 1;
      renderPage(currentPage, filteredProducts);
    });
  });
}

function setupNavigation() {
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
    const scrollY = window.scrollY + 200;
    let current = "home";
    for (const key in sections) {
      const section = sections[key];
      if (section && section.offsetTop <= scrollY) {
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
}

// Запускаємо при завантаженні
document.addEventListener('DOMContentLoaded', updateLogoText);

// І при зміні розміру вікна
window.addEventListener('resize', updateLogoText);



//Burger

document.addEventListener('DOMContentLoaded', () => {
  setupBurgerMenu();
});
