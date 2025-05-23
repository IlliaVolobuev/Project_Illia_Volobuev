
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
  }, {
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
  }
];

function renderProducts(filteredProducts) {
  const container = document.querySelector(".products-grid");
  container.innerHTML = "";

  // Ограничиваем массив до первых 6 элементов
  const limitedProducts = filteredProducts.slice(0, 6);

  limitedProducts.forEach((product) => {
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


// Получает отфильтрованный массив товаров на основе установленных фильтров
function getFilteredProducts() {
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;      // Минимальная цена
  const maxPrice = parseInt(document.getElementById("max-price").value) || 900;    // Максимальная цена

  // Получаем выбранный тип молока
  const milkRadio = document.querySelector("input[name='milk']:checked");
  const milkValue = milkRadio?.nextElementSibling?.nextElementSibling?.textContent.trim() || "";

  // Список выбранных стран
  const checkedCountries = Array.from(document.querySelectorAll(".checkbox-group input:checked"))
    .map(cb => cb.nextElementSibling?.nextElementSibling?.textContent.trim());

  // Фильтруем товары
  return products.filter(p => {
    if (p.price < minPrice || p.price > maxPrice) return false; // По цене

    // По молоку
    if (milkValue === "Тільки тваринне" && p.milk !== "тваринне") return false;
    if (milkValue === "Только рослинне" && p.milk !== "рослинне") return false;
    if (milkValue === "Без молока" && p.milk !== "без молока") return false;

    // По странам
    if (checkedCountries.length > 0 && !checkedCountries.includes(p.country)) return false;

    return true; // Прошло все фильтры
  });
}


// Применяет фильтры и перерисовывает товары
function applyFilters() {
  const filtered = getFilteredProducts(); // Получаем результат фильтрации
  renderProducts(filtered);               // Отображаем товары
}




// Сброс всех фильтров к исходному состоянию
function resetFilters() {
  // Сброс значений цен
  document.getElementById("min-price").value = 0;
  document.getElementById("max-price").value = 900;
  document.getElementById("min-range").value = 0;
  document.getElementById("max-range").value = 900;

  // Сброс фильтра молока (предполагается, что есть radio с value="any")
  const milkAny = document.querySelector("input[name='milk'][value='any']");
  if (milkAny) milkAny.checked = true;

  // Отмечаем все страны
  document.querySelectorAll(".checkbox-group input").forEach(cb => cb.checked = true);

  renderProducts(products); // Показываем все продукты
}

// Навешиваем обработчики на кнопки
document.querySelector(".primary-button").addEventListener("click", applyFilters);   // Кнопка "Застосувати"
document.querySelector(".secondary-button").addEventListener("click", resetFilters); // Кнопка "Скинути"



// Початковий рендер
renderProducts(products);
