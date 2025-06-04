// burgerMenu.js

export function setupBurgerMenu(burgerSelector = '#burger', navSelector = '#nav') {
  const burger = document.querySelector(burgerSelector);
  const nav = document.querySelector(navSelector);

  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
  });
}
