const CART_STORAGE_KEY = "drink2go-cart";

let cart = loadCart();

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = String(count);
  badge.hidden = count === 0;
}

function findCartItem(id) {
  return cart.find((item) => item.id === id);
}

function addToCart({ id, title, price, imgSrc }) {
  const existing = findCartItem(id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, title, price: Number(price), imgSrc, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  renderCartList();
}

function changeQty(id, delta) {
  const item = findCartItem(id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  saveCart();
  updateCartBadge();
  renderCartList();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartBadge();
  renderCartList();
}

function renderCartList() {
  const list = document.getElementById("cart-list");
  const empty = document.getElementById("cart-empty");
  const footer = document.getElementById("cart-footer");
  const totalEl = document.getElementById("cart-total-sum");

  if (!list || !empty || !footer || !totalEl) return;

  list.innerHTML = "";

  if (cart.length === 0) {
    empty.hidden = false;
    footer.hidden = true;
    return;
  }

  empty.hidden = true;
  footer.hidden = false;

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img src="${item.imgSrc}" alt="" class="cart-item__img">
      <div class="cart-item__info">
        <span class="cart-item__title">${item.title}</span>
        <span class="cart-item__price">${item.price} грн</span>
      </div>
      <div class="cart-item__qty">
        <button type="button" class="cart-item__qty-btn" data-action="minus" data-id="${item.id}" aria-label="Менше">−</button>
        <span>${item.qty}</span>
        <button type="button" class="cart-item__qty-btn" data-action="plus" data-id="${item.id}" aria-label="Більше">+</button>
      </div>
      <button type="button" class="cart-item__remove" data-action="remove" data-id="${item.id}" aria-label="Видалити">&times;</button>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = String(total);
}

function openCartModal() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  renderCartList();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeCartModal() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (!document.getElementById("login-modal")?.classList.contains("is-open")) {
    document.body.classList.remove("modal-open");
  }
}

function parseProductFromCard(card) {
  const title = card.querySelector(".product-title")?.textContent?.trim();
  const priceText = card.querySelector(".product-price")?.textContent?.replace(/\D/g, "");
  const imgSrc = card.querySelector(".product-image")?.getAttribute("src");
  if (!title || !priceText) return null;
  return {
    id: title,
    title,
    price: Number(priceText),
    imgSrc: imgSrc || "./img/coffee-can-10.png",
  };
}

function parseProductFromSlide(slide) {
  const title = slide.querySelector(".slider-title")?.textContent?.trim();
  const priceText = slide.querySelector(".current-price")?.textContent?.replace(/\D/g, "");
  const imgSrc = slide.querySelector(".slider-image")?.getAttribute("src");
  if (!title || !priceText) return null;
  return {
    id: title,
    title,
    price: Number(priceText),
    imgSrc: imgSrc || "./img/flat-white-img0.png",
  };
}

function initCart() {
  const basketTriggers = document.querySelectorAll(".basket-link");
  const cartModal = document.getElementById("cart-modal");
  const checkoutBtn = document.getElementById("cart-checkout");

  basketTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openCartModal();
    });
  });

  cartModal?.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeCartModal);
  });

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-to-cart");
    if (addBtn) {
      e.preventDefault();
      const card = addBtn.closest(".product-card");
      const product = card && parseProductFromCard(card);
      if (product) {
        addToCart(product);
        openCartModal();
      }
      return;
    }

    const buyBtn = e.target.closest(".buy-button");
    if (buyBtn) {
      e.preventDefault();
      const slide = buyBtn.closest(".slide");
      const product = slide && parseProductFromSlide(slide);
      if (product) {
        addToCart(product);
        openCartModal();
      }
      return;
    }

    const qtyBtn = e.target.closest(".cart-item__qty-btn, .cart-item__remove");
    if (qtyBtn) {
      const id = qtyBtn.dataset.id;
      const action = qtyBtn.dataset.action;
      if (action === "plus") changeQty(id, 1);
      else if (action === "minus") changeQty(id, -1);
      else if (action === "remove") removeFromCart(id);
    }
  });

  checkoutBtn?.addEventListener("click", () => {
    if (cart.length === 0) return;
    alert("Дякуємо! Замовлення оформлено (демо).");
    cart = [];
    saveCart();
    updateCartBadge();
    renderCartList();
    closeCartModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartModal?.classList.contains("is-open")) {
      closeCartModal();
    }
  });

  updateCartBadge();
  renderCartList();
}

export { initCart, addToCart, openCartModal, closeCartModal };
