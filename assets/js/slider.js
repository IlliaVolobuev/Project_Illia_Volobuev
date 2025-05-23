export function initSlider() {
  let currentSlide = 0; // Индекс текущего слайда (по умолчанию первый)

  // Получаем все слайды, кнопки управления и индикаторы
  const slides = document.querySelectorAll(".slide"); // Все слайды
  const prevBtn = document.querySelector(".slider-button.prev"); // Кнопка "назад"
  const nextBtn = document.querySelector(".slider-button.next"); // Кнопка "вперёд"
  const indicators = document.querySelectorAll(".slider-indicator"); // Индикаторы (точки под слайдером)
  const sliderSection = document.querySelector(".slider"); // Секция слайдера (для изменения фона)

  // Массив фонов для каждого слайда
  const slideBackgrounds = [
    "#F3EBE1", // фон для первого слайда
    "#EAE6FC", // фон для второго слайда
    "#E5E6E8"  // фон для третьего слайда
  ];

  // Показывает слайд по указанному индексу
  function showSlide(index) {
    // Активируем нужный слайд, отключаем остальные
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index); // добавляем класс "active" только нужному слайду
    });

    // Активируем нужный индикатор
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index); // класс "active" только у активного индикатора
    });

    // Меняем фон всей секции слайдера
    sliderSection.style.backgroundColor = slideBackgrounds[index];

    currentSlide = index; // обновляем индекс текущего слайда
  }

  // Переход к следующему слайду
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length; // круговая прокрутка
    showSlide(nextIndex); // показываем следующий слайд
  }

  // Переход к предыдущему слайду
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length; // круговая прокрутка назад
    showSlide(prevIndex); // показываем предыдущий слайд
  }

  // Назначаем обработчики событий на кнопки
  nextBtn.addEventListener("click", nextSlide); // кнопка "вперёд"
  prevBtn.addEventListener("click", prevSlide); // кнопка "назад"

  // Назначаем обработчики на индикаторы (точки под слайдером)
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.dataset.slide); // получаем индекс из data-slide
      showSlide(index); // показываем выбранный слайд
    });
  });

  showSlide(currentSlide); // показываем первый слайд при инициализации
}
