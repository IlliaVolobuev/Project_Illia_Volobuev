
// Приклад масиву товарів з розширеними полями для фільтрації
const products = [
  {
    imgSrc: "./assets/img/coffee-can-10.png",
    altText: "Декаф Флет Уайт",
    title: "Декаф Флет Уайт",
    description: `Кава без кофеїну з Ефіопії з <br> натуральним фермерським <br> молоком` ,
    price: 225,
    milk: "тваринне",
    country: "Ефіопія"
  },
  {
    imgSrc: "./assets/img/coffee-can-9.png",
    altText: "Лавандовый Латте",
    title: "Лавандовый Латте",
    description: `Невероятное сочетание перуанской арабики с молоком ламы и лавандой` ,
    price: 265,
    milk: "тваринне",
    country: "Перу"
  },
  {
    imgSrc: "./assets/img/coffee-can-8.png",
    altText: "Тройной Эспрессо",
    title: "Тройной Эспрессо",
    description: `Этот тройной эспрессо из Колумбии мощнее укола адреналина` ,
    price: 375,
    milk: "без молока",
    country: "Колумбія"
  },
  {
    imgSrc: "./assets/img/coffee-can-7.png",
    altText: "Молочний Капучино",
    title: "Молочний Капучино",
    description: `Ніжний капучино з добірної арабіки та вершковим молоком` ,
    price: 245,
    milk: "тваринне",
    country: "Бразилія"
  },
  {
    imgSrc: "./assets/img/coffee-can-6.png",
    altText: "Флоральна Рослина",
    title: "Флоральна Рослина",
    description: `Легкий рослинний латте з нотками жасмину та овсяним молоком` ,
    price: 230,
    milk: "рослинне",
    country: "Коста-Ріка"
  },
  {
    imgSrc: "./assets/img/coffee-can-5.png",
    altText: "Бразильська Класика",
    title: "Бразильська Класика",
    description: `Справжня класика з бразильських плантацій із вершковим присмаком` ,
    price: 290,
    milk: "тваринне",
    country: "Бразилія"
  }
];

function renderProducts(filteredProducts) {
  const container = document.querySelector(".products-grid");
  container.innerHTML = "";

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.imgSrc}" alt="${product.altText}" class="product-image">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">${product.price}грн</span>
        <button class="add-to-cart">
          <img src="./img/union6.svg" alt="Додати в кошик">
          <span>В кошик</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}
function getFilteredProducts() {
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice = parseInt(document.getElementById("max-price").value) || 900;

  const milkValue = document.querySelector("input[name='milk']:checked").nextElementSibling.nextElementSibling.textContent.trim();
  
  const checkedCountries = Array.from(document.querySelectorAll(".checkbox-group input:checked"))
    .map(cb => cb.nextElementSibling.nextElementSibling.textContent.trim());

  return products.filter(p => {
    // Фильтр по цене
    if (p.price < minPrice || p.price > maxPrice) return false;
    
    // Фильтр по молоку
    if (milkValue === "Тільки тваринне" && p.milk !== "тваринне") return false;
    if (milkValue === "Только рослинне" && p.milk !== "рослинне") return false;
    if (milkValue === "Без молока" && p.milk !== "без молока") return false;
    
    // Фильтр по странам
    if (checkedCountries.length > 0 && !checkedCountries.includes(p.country)) return false;
    
    return true;
  });
}

function applyFilters() {
  const filtered = getFilteredProducts();
  renderProducts(filtered);
}

function resetFilters() {
  document.getElementById("min-price").value = 0;
  document.getElementById("max-price").value = 900;
  document.getElementById("min-range").value = 0;
  document.getElementById("max-range").value = 900;
  document.querySelector("input[name='milk'][value='any']").checked = true;
  
  document.querySelectorAll(".checkbox-group input").forEach(cb => {
    cb.checked = true;
  });

  renderProducts(products);
}

function resetFilters() {
  document.getElementById("min-price").value = 0;
  document.getElementById("max-price").value = 900;

  document.getElementById("min-range").value = 0;
  document.getElementById("max-range").value = 900;

  document.querySelector("input[name='milk']").checked = true;
  document.querySelectorAll(".checkbox-group input").forEach(cb => cb.checked = true);

  renderProducts(products);
}

document.querySelector(".primary-button").addEventListener("click", applyFilters);
document.querySelector(".secondary-button").addEventListener("click", resetFilters);

// Початковий рендер
renderProducts(products);
