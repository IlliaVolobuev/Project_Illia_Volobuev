// Импортируем функции из других модулей
import { showFrame1 } from './showFrame.js';  // функция показа первого фрейма (например, анимация или блок)
import { initRange } from './range.js';       // инициализация двойного диапазона (range)
import { initSlider } from './slider.js';     // инициализация слайдера

// Ждём полной загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  initRange();     // запускаем диапазон цен
  initSlider();    // запускаем слайдер
  showFrame1();    // отображаем первый фрейм

  // Навигация по секциям
  const sections = {
    home: document.body,                         // секция "домой" — вся страница
    catalog: document.querySelector("#catalog"), // секция "каталог"
    map: document.querySelector("#map"),         // секция "карта"
    footer: document.querySelector("#footer"),   // секция "подвал"
  };

  // Ссылки навигации (меню)
  const navLinks = {
    home: document.querySelector("#nav-home"),       // пункт меню "домой"
    catalog: document.querySelector("#nav-catalog"), // пункт меню "каталог"
    map: document.querySelector("#nav-map"),         // пункт меню "карта"
    footer: document.querySelector("#nav-footer"),   // пункт меню "подвал"
  };

  // Получает текущую секцию, в которой находится пользователь
  function getCurrentSection() {
    const scrollY = window.scrollY + 200; // смещение вниз, чтобы активировать секцию чуть раньше
    let current = "home"; // по умолчанию секция — "домой"

    for (const key in sections) {
      const section = sections[key];
      if (section.offsetTop <= scrollY) {
        current = key; // если секция видима — сохраняем как текущую
      }
    }

    return current;
  }

  // Обновляет активную ссылку в меню на основе текущей секции
  function updateActiveLink() {
    const current = getCurrentSection(); // определяем текущую секцию
    for (const key in navLinks) {
      navLinks[key].classList.remove("active-link"); // снимаем активность со всех
    }
    navLinks[current].classList.add("active-link"); // добавляем активность текущей
  }

  // При прокрутке страницы обновляем активную ссылку в меню
  window.addEventListener("scroll", updateActiveLink);

  // Сортировка товаров
  const sortSelect = document.querySelector(".sort-select");    // элемент, по которому кликают, чтобы открыть сортировку
  const sortCurrent = document.getElementById("sort-current");  // элемент, отображающий текущую сортировку
  const sortOptions = document.querySelector(".sort-options");  // список опций сортировки
  const productContainer = document.querySelector(".products-grid"); // контейнер с товарами

  // Показать/скрыть список сортировки при клике
  sortSelect.addEventListener("click", () => {
    sortOptions.classList.toggle("hidden"); // переключение класса, скрывающего список
  });

  // Сортирует массив товаров по выбранному методу
  function sortProducts(method, productsArray) {
    let sorted;

    switch (method) {
      case "az": // сортировка по алфавиту
        sorted = [...productsArray].sort((a, b) => a.title.localeCompare(b.title, 'uk')); // локаль — украинская
        break;
      case "price": // сортировка по цене
        sorted = [...productsArray].sort((a, b) => a.price - b.price);
        break;
      default: // без сортировки
        sorted = productsArray;
        break;
    }

    renderProducts(sorted); // отображаем отсортированные товары
  }

  // Назначаем обработчики на элементы списка сортировки
  sortOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", (e) => {
      const sortType = option.dataset.sort; // тип сортировки из data-sort
      sortCurrent.textContent = option.textContent; // обновляем отображаемую текущую сортировку
      sortOptions.classList.add("hidden"); // скрываем выпадающий список
      
      // Получаем текущий список отфильтрованных товаров
      const currentProducts = getFilteredProducts();
      sortProducts(sortType, currentProducts); // сортируем их
    });
  });
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
