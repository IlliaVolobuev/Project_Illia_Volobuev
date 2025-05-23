import { showFrame1 } from './showFrame.js';
import { initRange } from './range.js';
import { initSlider } from './slider.js';
import { renderProducts } from './render.js';
import { getFilteredProducts, resetFilters } from './filters.js';
import { sortProducts as sortProductsFn } from './sort.js';
import { products } from './data.js';

document.addEventListener("DOMContentLoaded", () => {
  // Инициализация интерфейса
  initRange();
  initSlider();
  showFrame1();
  renderProducts(products); // первичный рендер

  // Обработка фильтрации
  document.querySelector(".primary-button").addEventListener("click", () => {
    renderProducts(getFilteredProducts());
  });

  document.querySelector(".secondary-button").addEventListener("click", () => {
    resetFilters(renderProducts);
  });

  // Обработка сортировки
  setupSorting();

  // Обработка меню навигации
  setupNavigation();
});

// Установка обработки сортировки
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

      const filtered = getFilteredProducts();
      sortProductsFn(sortType, filtered);
    });
  });
}

// Установка обработки активной ссылки в меню
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




