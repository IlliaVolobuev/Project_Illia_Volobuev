// showFrame.js

function showFrame() {
  const frame1 = document.querySelector(".frame-1");
  const { classList } = frame1;

  classList.contains("no-active")
    ? (classList.add("active"), classList.remove("no-active"))
    : (classList.remove("active"), classList.add("no-active"));
}

export { showFrame };
