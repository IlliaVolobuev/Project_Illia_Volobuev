// showFrame.js

// Находим кнопку "Войти" по классу .forma-login
const formaLogin = document.querySelector(".forma-login");

// Находим элемент фрейма по классу .frame-1
const frame1 = document.querySelector(".frame-1");

// Объявляем функцию showFrame1 для переключения классов на frame1
function showFrame1() {
    // Деструктуризация: получаем classList элемента frame1
    const { classList } = frame1;

    // Если есть класс "no-active", то меняем на "active", иначе наоборот
    classList.contains("no-active")
        ? (classList.add("active"), classList.remove("no-active")) // если no-active есть: добавить active, убрать no-active
        : (classList.remove("active"), classList.add("no-active")); // если no-active нет: убрать active, добавить no-active
}

// Вешаем обработчик события на кнопку: при клике запускаем showFrame1
formaLogin.addEventListener("click", showFrame1);

// Экспортируем функцию showFrame1 для использования в других файлах
export { showFrame1 };
