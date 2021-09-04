const burger = document.querySelector(".burger");
const navPaths = document.querySelector(".nav__paths");
const navButtons = document.querySelector(".nav__buttons");

burger.addEventListener("click", () => {
    navPaths.classList.toggle("active");
    navButtons.classList.toggle("active");
});

navPaths.addEventListener("click", () => {
    navPaths.classList.remove("active");
    navButtons.classList.remove("active");
});

navButtons.addEventListener("click", () => {
    navPaths.classList.remove("active");
    navButtons.classList.remove("active");
});