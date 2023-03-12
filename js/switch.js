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
