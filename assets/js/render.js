import { products } from "./data.js";

const cardsPerPage = 6;
let currentPage = 1;

const productsGrid = document.querySelector(".products-grid");
const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");
const pageButtons = document.querySelectorAll(".page-button");

// Основна функція для рендерингу сторінки
export function renderPage(pageNumber = 1, data = products) {
  productsGrid.innerHTML = "";

  const start = (pageNumber - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const currentProducts = data.slice(start, end);

  currentProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.imgSrc}" alt="${product.altText}" class="product-image">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">${product.price}грн</span>
        <button class="add-to-cart">
          <img src="./assets/img/union6.svg" alt="Додати в кошик">
          <span>В кошик</span>
        </button>
      </div>
    `;
    productsGrid.appendChild(card);
  });

  pageButtons.forEach((btn, index) => {
    btn.classList.toggle("page-button-active", index + 1 === pageNumber);
  });

  currentPage = pageNumber;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === Math.ceil(data.length / cardsPerPage);
}

// Навігація
prevBtn.addEventListener("click", () => {
  renderPage(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
  renderPage(currentPage + 1);
});

pageButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    renderPage(index + 1);
  });
});

// Стартовий рендер
renderPage(1);

