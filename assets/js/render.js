export function renderProducts(productsArray) {
  const container = document.querySelector(".products-grid");
  container.innerHTML = "";

  const cardsHTML = productsArray.slice(0, 6).map(product => `
    <div class="product-card">
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
    </div>
  `).join("");

  container.innerHTML = cardsHTML;
}
