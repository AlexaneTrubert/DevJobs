const inputFormTitle = document.querySelector(".filter-title");
const toggle = document.querySelector("#checkbox");
const html = document.querySelector("html");

//modification du placeholder en fonction de la taille de l'écran
function placeholder() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
        inputFormTitle.placeholder = "Filter by title, companies, expertise…";
    } else {
        inputFormTitle.placeholder = "Filter by title...";
    }
}

// switch light / dark mode au clic sur le toggle
function switchMode() {
    if (toggle.checked === true) {
        html.className = "dark"
    } else {
        html.className = "light";
    }
}

// Ouverture modale au clic sur le bouton filtre
const btnFilter = document.querySelector(".filter");
const modal = document.querySelector(".form-group-modal");

btnFilter.addEventListener("click", function() {
    const open = JSON.parse(btnFilter.getAttribute('aria-expanded'));
    btnFilter.setAttribute('aria-expanded', !open);
    modal.hidden = !modal.hidden;
})

placeholder();
window.addEventListener("resize", placeholder);
toggle.addEventListener("click", switchMode);
