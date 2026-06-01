const DEMO_LOGIN = "user";
const DEMO_PASSWORD = "1234";
const USER_STORAGE_KEY = "drink2go-user";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  } catch {
    return null;
  }
}

function setStoredUser(user) {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

function updateAccountUI() {
  const user = getStoredUser();
  const label = document.querySelector(".account-label");
  const loginForm = document.getElementById("login-form");
  const loggedInPanel = document.getElementById("logged-in-panel");
  const loggedInName = document.getElementById("logged-in-name");
  const modalTitle = document.getElementById("login-modal-title");

  if (!label || !loginForm || !loggedInPanel) return;

  if (user) {
    label.textContent = user.login;
    loginForm.hidden = true;
    loggedInPanel.hidden = false;
    if (loggedInName) loggedInName.textContent = user.login;
    if (modalTitle) modalTitle.textContent = "Профіль";
  } else {
    label.textContent = "Увійти";
    loginForm.hidden = false;
    loggedInPanel.hidden = true;
    if (modalTitle) modalTitle.textContent = "Увійти";
  }
}

function openLoginModal() {
  const modal = document.getElementById("login-modal");
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  updateAccountUI();
  const loginInput = modal.querySelector('input[name="login"]');
  if (loginInput && !getStoredUser()) loginInput.focus();
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (!document.getElementById("cart-modal")?.classList.contains("is-open")) {
    document.body.classList.remove("modal-open");
  }
  const errorEl = document.getElementById("login-error");
  if (errorEl) errorEl.hidden = true;
}

function initAuth() {
  const loginTriggers = document.querySelectorAll(".forma-login");
  const modal = document.getElementById("login-modal");
  const form = document.getElementById("login-form");
  const logoutBtn = document.getElementById("logout-btn");

  loginTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openLoginModal();
    });
  });

  modal?.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeLoginModal);
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = form.login.value.trim();
    const password = form.password.value;
    const errorEl = document.getElementById("login-error");

    if (login === DEMO_LOGIN && password === DEMO_PASSWORD) {
      setStoredUser({ login });
      form.reset();
      if (errorEl) errorEl.hidden = true;
      updateAccountUI();
      closeLoginModal();
      return;
    }

    if (errorEl) {
      errorEl.textContent = "Невірний логін або пароль. Спробуйте user / 1234";
      errorEl.hidden = false;
    }
  });

  logoutBtn?.addEventListener("click", () => {
    setStoredUser(null);
    updateAccountUI();
    closeLoginModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
      closeLoginModal();
    }
  });

  updateAccountUI();
}

export { openLoginModal, closeLoginModal, initAuth, getStoredUser };
