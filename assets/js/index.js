import { showFrame1 } from './showFrame.js';

const formaLogin = document.querySelector(".forma-login");
formaLogin.addEventListener("click", showFrame1);

const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const minPrice = document.getElementById("min-price");
const maxPrice = document.getElementById("max-price");
const activeTrack = document.getElementById("range-active");

const maxValue = 900;
const minGap = 50;

function updateTrack() {
  const min = parseInt(minRange.value);
  const max = parseInt(maxRange.value);

  const percentMin = (min / maxValue) * 100;
  const percentMax = (max / maxValue) * 100;

  activeTrack.style.left = percentMin + "%";
  activeTrack.style.width = (percentMax - percentMin) + "%";
}

function syncInputs(event) {
  let minVal = parseInt(minRange.value);
  let maxVal = parseInt(maxRange.value);

  if (maxVal - minVal < minGap) {
    if (event.target === minRange) {
      minRange.value = maxVal - minGap;
    } else {
      maxRange.value = minVal + minGap;
    }
  }

  minPrice.value = minRange.value;
  maxPrice.value = maxRange.value;
  updateTrack();
}

function syncRanges() {
  let minVal = parseInt(minPrice.value);
  let maxVal = parseInt(maxPrice.value);

  if (maxVal - minVal >= minGap && minVal >= 0 && maxVal <= maxValue) {
    minRange.value = minVal;
    maxRange.value = maxVal;
    updateTrack();
  }
}

minRange.addEventListener("input", syncInputs);
maxRange.addEventListener("input", syncInputs);
minPrice.addEventListener("change", syncRanges);
maxPrice.addEventListener("change", syncRanges);

updateTrack(); // виклик при старті
