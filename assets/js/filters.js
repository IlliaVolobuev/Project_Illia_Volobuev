import { products } from './data.js';

export function getFilteredProducts() {
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice = parseInt(document.getElementById("max-price").value) || 900;

  const milkRadio = document.querySelector("input[name='milk']:checked");
  const milkValue = milkRadio?.nextElementSibling?.nextElementSibling?.textContent.trim() || "";

  const checkedCountries = Array.from(document.querySelectorAll(".checkbox-group input:checked"))
    .map(cb => cb.nextElementSibling?.nextElementSibling?.textContent.trim());

  return products.filter(p => {
    if (p.price < minPrice || p.price > maxPrice) return false;

    if (milkValue === "Тільки тваринне" && p.milk !== "тваринне") return false;
    if (milkValue === "Только рослинне" && p.milk !== "рослинне") return false;
    if (milkValue === "Без молока" && p.milk !== "без молока") return false;

    if (checkedCountries.length > 0 && !checkedCountries.includes(p.country)) return false;

    return true;
  });
}

export function resetFilters(renderCallback) {
  document.getElementById("min-price").value = 0;
  document.getElementById("max-price").value = 900;
  document.getElementById("min-range").value = 0;
  document.getElementById("max-range").value = 900;

  const milkAny = document.querySelector("input[name='milk'][value='any']");
  if (milkAny) milkAny.checked = true;

  document.querySelectorAll(".checkbox-group input").forEach(cb => cb.checked = true);

  renderCallback(products);
}
