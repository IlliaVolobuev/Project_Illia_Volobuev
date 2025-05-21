export function initSlider() {
  let currentSlide = 0;

  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-button.prev");
  const nextBtn = document.querySelector(".slider-button.next");
  const indicators = document.querySelectorAll(".slider-indicator");
  const sliderSection = document.querySelector(".slider");

  const slideBackgrounds = [
    "#F3EBE1",
    "#EAE6FC",
    "#E5E6E8"
  ];

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });

    sliderSection.style.backgroundColor = slideBackgrounds[index];

    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.dataset.slide);
      showSlide(index);
    });
  });

  showSlide(currentSlide);
}
