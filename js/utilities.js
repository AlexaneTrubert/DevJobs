const toggleSwitchTheme = document.querySelector("#checkbox");
const body = document.body;

// switch light / dark mode au clic sur le toggle
function switchMode() {
    if (toggleSwitchTheme.checked === true) {
        body.className = "dark"
        localStorage.setItem('theme', 'dark');
    } else {
        body.className = "light";
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitchTheme.addEventListener("click", switchMode);

// On check le local storage pour savoir si la personne a choisi un thème
// si oui on applique son choix

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length === 0) {
        if (globalThis.matchMedia("(prefers-color-scheme:dark)").matches === true) {
            toggleSwitchTheme.checked = true;
            body.className = "dark"
        } else {
            toggleSwitchTheme.checked = false;
            body.className = "light";
        }
    } else {
        if (localStorage.getItem('theme') === 'dark') {
            body.className = "dark";
            toggleSwitchTheme.checked = true;
        } else if (localStorage.getItem('theme') === "light") {
            body.className = "light";
            toggleSwitchTheme.checked = false;
        }
    }
});


function timestamp(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const seconds = (today.getTime() - date.getTime()) / 1000;
    let value;
    let unit;

    let y = Math.floor(seconds / (3600 * 24 * 365));
    let m = Math.floor(seconds / (3600 * 24 * 30));
    let w = Math.floor(seconds / (3600 * 24 * 7));
    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor(seconds / 3600);
    let mn = Math.floor(seconds / 60);
    let s = Math.floor(seconds % 60);

    if(y > 2) {
        value = "A long time";
        unit = "";
    }
    else if (y > 0 && y < 2) {
        value = y;
        unit = y > 1 ? "years" : "year";
    } else if (m > 0) {
        value = m;
        unit = "month";
    } else if (w > 0) {
        value = w;
        unit = w > 1 ? "weeks" : "week";
    } else if (d > 0) {
        value = d;
        unit = d > 1 ? "days" : "day";
    } else if (h > 0) {
        value = h;
        unit = h > 1 ? "hours" : "hour";
    } else if (mn > 0) {
        value = mn;
        unit = mn > 1 ? "minutes" : "minute";
    } else {
        value = s;
        unit = s > 1 ? "seconds" : "second";
    }

    return value + " " + unit + " ago";
}

//modification du placeholder en fonction de la taille de l'écran
function placeholder() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
        inputFormTitle.placeholder = "Filter by title, companies, expertise…";
    } else {
        inputFormTitle.placeholder = "Filter by title...";
    }
}

// Fonction pour ouvrir ou fermer la modal
function modalState() {
    const modal = document.querySelector(".form-group-modal");
    const open = JSON.parse(btnFilter.getAttribute('aria-expanded'));
    btnFilter.setAttribute('aria-expanded', !open);
    modal.hidden = !modal.hidden;
    overlay.hidden = !overlay.hidden;
}