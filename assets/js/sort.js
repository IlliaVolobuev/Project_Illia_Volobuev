import { renderProducts } from './render.js';

export function sortProducts(method, productsArray) {
  let sorted;

  switch (method) {
    case "az":
      sorted = [...productsArray].sort((a, b) => a.title.localeCompare(b.title, 'uk'));
      break;
    case "price":
      sorted = [...productsArray].sort((a, b) => a.price - b.price);
      break;
    default:
      sorted = productsArray;
  }

  renderProducts(sorted);
}
