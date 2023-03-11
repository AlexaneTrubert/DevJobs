const inputFormTitle = document.querySelector(".filter-title");
const loadMoreBtn = document.querySelector(".btn-load");
const overlay = document.querySelector(".overlay");
let offsetJob = 0;
const mainContent = document.querySelector(".cards-list");
const btnFilter = document.querySelector(".filter");

// Moteur de recherche
const form = document.querySelector(".main-form");
const text = document.querySelector(".filter-title").value;
const jobLocation = document.querySelector("#location").value;
const fulltime = document.querySelector(".checkbox");
const limit = 12;

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

btnFilter.addEventListener("click", modalState);
overlay.addEventListener("click", modalState);

placeholder();
window.addEventListener("resize", placeholder);


// Affichages de toutes les offres
function getMoreJobs() {
    getAllJobs(
        offsetJob,
        function (data) {
            offsetJob += data.jobs.length;
            data.jobs.forEach(jobs => {
                addJobs(jobs.company, jobs.contract, jobs.id, jobs.location, jobs.logo, jobs.logoBackground, jobs.position, jobs.postedAt);
            });
        },
        function () {
            alert("Erreur !");
        },
        loadMoreBtn,
        text,
        jobLocation,
        fulltime,
        limit
    );
}

getMoreJobs();
loadMoreBtn.addEventListener("click", getMoreJobs);


// Formulaire de recherche
form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    mainContent.innerHTML = "";
    offsetJob = 0;

    const text = document.querySelector(".filter-title").value;
    const jobLocation = document.querySelector("#location").value;
    const fulltime = document.querySelector(".checkbox");

    getAllJobs(
        0,
        function (data) {
            offsetJob += data.jobs.length;
            data.jobs.forEach(jobs => {
                addJobs(jobs.company, jobs.contract, jobs.id, jobs.location, jobs.logo, jobs.logoBackground, jobs.position, jobs.postedAt);
            });
            if (window.matchMedia("(max-width: 375px)").matches) {
                modalState();
            }
        },
        function () {
            alert("Erreur !");
        },
        loadMoreBtn,
        text,
        jobLocation,
        fulltime,
        limit
    );
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
