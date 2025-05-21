const products = [
  {
    imgSrc: "./img/coffee-can-10.png",
    altText: "Декаф Флет Уайт",
    title: "Декаф Флет Уайт",
    description: `Кава без кофеїну з Ефіопії з <br> натуральним фермерським <br> молоком`,
    price: "225грн"
  },
  {
    imgSrc: "./img/coffee-can-9.png",
    altText: "Лавандовый Латте",
    title: "Лавандовый Латте",
    description: `Невероятное сочетание перуанской высокогорной арабики с молоком ламы и лавандовым сиропом унесёт вас прямо на вершину Радужных гор`,
    price: "265грн"
  },
  {
    imgSrc: "./img/coffee-can-8.png",
    altText: "Тройной Эспрессо",
    title: "Тройной Эспрессо",
    description: `Мощнее укола адреналина, чернее самой тёмной ночи, этот тройной эспрессо из Колумбии покажет вам, что такое настоящая бодрость`,
    price: "375грн"
  },
  {
    imgSrc: "./img/coffee-can-7.png",
    altText: "Карамельный Макиато",
    title: "Карамельный Макиато",
    description: `Сладкий и мягкий кофе с карамельным сиропом и вспененным молоком — идеальный выбор для уютных вечеров`,
    price: "240грн"
  },
  {
    imgSrc: "./img/coffee-can-6.png",
    altText: "Ванильный Раф",
    title: "Ванильный Раф",
    description: `Нежный кофе с ванильным ароматом и сливочным вкусом, который подарит вам настоящее наслаждение`,
    price: "280грн"
  },
  {
    imgSrc: "./img/coffee-can-5.png",
    altText: "Мокко Классик",
    title: "Мокко Классик",
    description: `Кофе с шоколадным оттенком, сливками и легкой горчинкой — для тех, кто любит классические вкусы`,
    price: "300грн"
  }
];


// Функция создания карточки (как в предыдущем примере)
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.imgSrc}" alt="${product.altText}" class="product-image">
    <h3 class="product-title">${product.title}</h3>
    <p class="product-description">${product.description}</p>
    <div class="product-footer">
      <span class="product-price">${product.price}</span>
      <button class="add-to-cart">
        <img src="./img/union6.svg" alt="Додати в кошик">
        <span>В кошик</span>
      </button>
    </div>
  `;

  return card;
}

const productsGrid = document.querySelector(".products-grid");
productsGrid.innerHTML = ""; // очищаем, если нужно

// Берём первые 6 товаров из массива и создаём карточки
products.slice(0, 6).forEach(product => {
  const card = createProductCard(product);
  productsGrid.appendChild(card);
});
