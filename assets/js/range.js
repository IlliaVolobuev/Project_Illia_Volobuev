export function initRange() {
  // Получаем элементы DOM слайдеров и полей ввода значений
  const minRange = document.getElementById("min-range"); // левый (минимальный) слайдер
  const maxRange = document.getElementById("max-range"); // правый (максимальный) слайдер
  const minPrice = document.getElementById("min-price"); // поле ввода минимальной цены
  const maxPrice = document.getElementById("max-price"); // поле ввода максимальной цены
  const activeTrack = document.getElementById("range-active"); // цветной трек между ползунками

  const maxValue = 900; // максимальное значение диапазона
  const minGap = 50; // минимально допустимая разница между значениями

  // Обновляет положение цветного трека между ползунками
  function updateTrack() {
    const min = parseInt(minRange.value); // текущее значение минимального слайдера
    const max = parseInt(maxRange.value); // текущее значение максимального слайдера

    const percentMin = (min / maxValue) * 100; // процентная позиция левого ползунка
    const percentMax = (max / maxValue) * 100; // процентная позиция правого ползунка

    activeTrack.style.left = percentMin + "%"; // установка левого отступа активного трека
    activeTrack.style.width = (percentMax - percentMin) + "%"; // установка ширины активного трека
  }

  // Синхронизирует значения слайдеров и текстовых полей при изменении слайдера
  function syncInputs(event) {
    let minVal = parseInt(minRange.value); // значение минимального слайдера
    let maxVal = parseInt(maxRange.value); // значение максимального слайдера

    // Проверка на соблюдение минимального зазора между слайдерами
    if (maxVal - minVal < minGap) {
      if (event.target === minRange) {
        minRange.value = maxVal - minGap; // если сдвигается левый ползунок, устанавливаем ограничение
      } else {
        maxRange.value = minVal + minGap; // если сдвигается правый ползунок, устанавливаем ограничение
      }
    }

    // Синхронизация текстовых полей с текущими значениями слайдеров
    minPrice.value = minRange.value;
    maxPrice.value = maxRange.value;
    updateTrack(); // обновление трека
  }

  // Синхронизирует значения слайдеров при изменении текстовых полей
  function syncRanges() {
    let minVal = parseInt(minPrice.value); // значение из текстового поля min
    let maxVal = parseInt(maxPrice.value); // значение из текстового поля max

    // Проверка валидности введённых значений
    if (maxVal - minVal >= minGap && minVal >= 0 && maxVal <= maxValue) {
      minRange.value = minVal; // установка значения на слайдер
      maxRange.value = maxVal;
      updateTrack(); // обновление трека
    }
  }

  // Назначаем обработчики событий
  minRange.addEventListener("input", syncInputs); // при движении левого слайдера
  maxRange.addEventListener("input", syncInputs); // при движении правого слайдера
  minPrice.addEventListener("change", syncRanges); // при изменении текстового поля min
  maxPrice.addEventListener("change", syncRanges); // при изменении текстового поля max

  updateTrack(); // начальная инициализация трека
}
