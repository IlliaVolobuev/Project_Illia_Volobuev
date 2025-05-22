// const products = [
//   {
//     imgSrc: "./assets/img/coffee-can-10.png",
//     altText: "Декаф Флет Уайт",
//     title: "Декаф Флет Уайт",
//     description: `Кава без кофеїну з Ефіопії з <br> натуральним фермерським <br> молоком`,
//     price: "225грн"
//   },
//   {
//     imgSrc: "./assets/img/coffee-can-9.png",
//     altText: "Лавандовый Латте",
//     title: "Лавандовый Латте",
//     description: `Невероятное сочетание перуанской высокогорной арабики с молоком ламы и лавандовым сиропом унесёт вас прямо на вершину Радужных гор`,
//     price: "265грн"
//   },
//   {
//     imgSrc: "./assets/img/coffee-can-8.png",
//     altText: "Тройной Эспрессо",
//     title: "Тройной Эспрессо",
//     description: `Мощнее укола адреналина, чернее самой тёмной ночи, этот тройной эспрессо из Колумбии покажет вам, что такое настоящая бодрость`,
//     price: "375грн"
//   },
//   {
//   imgSrc: "./assets/img/coffee-can-7.png",
//   altText: "Молочний Капучино",
//   title: "Молочний Капучино",
//   description: `Ніжний і збалансований капучино з добірної арабіки та вершковим молоком, ідеальний для затишного ранку`,
//   price: "245грн"
// },
//   {
//     imgSrc: "./assets/img/coffee-can-6.png",
//     altText: "Ванильный Раф",
//     title: "Ванильный Раф",
//     description: `Нежный кофе с ванильным ароматом и сливочным вкусом, который подарит вам настоящее наслаждение`,
//     price: "280грн"
//   },
//   {
//     imgSrc: "./assets/img/coffee-can-5.png",
//     altText: "Мокко Классик",
//     title: "Мокко Классик",
//     description: `Кофе с шоколадным оттенком, сливками и легкой горчинкой — для тех, кто любит классические вкусы`,
//     price: "300грн"
//   }
// ];


// // Функция создания карточки (как в предыдущем примере)
// function createProductCard(product) {
//   const card = document.createElement("div");
//   card.classList.add("product-card");

//   card.innerHTML = `
//     <img src="${product.imgSrc}" alt="${product.altText}" class="product-image">
//     <h3 class="product-title">${product.title}</h3>
//     <p class="product-description">${product.description}</p>
//     <div class="product-footer">
//       <span class="product-price">${product.price}</span>
//       <button class="add-to-cart">
//         <img src="./img/union6.svg" alt="Додати в кошик">
//         <span>В кошик</span>
//       </button>
//     </div>
//   `;

//   return card;
// }

// const productsGrid = document.querySelector(".products-grid");
// productsGrid.innerHTML = ""; // очищаем, если нужно

// // Берём первые 6 товаров из массива и создаём карточки
// products.slice(0, 6).forEach(product => {
//   const card = createProductCard(product);
//   productsGrid.appendChild(card);
// });





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

function applyFilters() {
  const minPrice = parseInt(document.getElementById("min-price").value);
  const maxPrice = parseInt(document.getElementById("max-price").value);

  const milkRadio = document.querySelector("input[name='milk']:checked").nextElementSibling.nextElementSibling.innerText;

  const checkedCountries = [...document.querySelectorAll(".checkbox-group input:checked")].map(
    (cb) => cb.nextElementSibling.nextElementSibling.innerText
  );

  let filtered = products.filter(p =>
    p.price >= minPrice &&
    p.price <= maxPrice &&
    (milkRadio === "Неважливо" || (milkRadio === "Тільки тваринне" && p.milk === "тваринне") ||
     (milkRadio === "Только рослинне" && p.milk === "рослинне") ||
     (milkRadio === "Без молока" && p.milk === "без молока")) &&
    checkedCountries.includes(p.country)
  );

  renderProducts(filtered);
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
