
export function updateLogoText() {
  const logoDrink = document.querySelector('.logo-drink');
  const logoGo = document.querySelector('.logo-go');

  if (window.innerWidth <= 768) {
    logoDrink.textContent = 'D';
    logoGo.textContent = 'G';
  } else {
    logoDrink.textContent = 'Drink';
    logoGo.textContent = 'go';
  }
}

// Запускаємо при завантаженні
document.addEventListener('DOMContentLoaded', updateLogoText);

// І при зміні розміру вікна
window.addEventListener('resize', updateLogoText);