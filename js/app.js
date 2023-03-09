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
        function(data) {
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
form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    mainContent.innerHTML = "";
    offsetJob = 0;

    const text = document.querySelector(".filter-title").value;
    const jobLocation = document.querySelector("#location").value;
    const fulltime = document.querySelector(".checkbox");

    modalState();

    getAllJobs(
        0,
        function(data) {
            offsetJob += data.jobs.length;
            data.jobs.forEach(jobs => {
                addJobs(jobs.company, jobs.contract, jobs.id, jobs.location, jobs.logo, jobs.logoBackground, jobs.position, jobs.postedAt);
            });
        },
        function() {
            alert("Erreur !");
        },
        loadMoreBtn,
        text,
        jobLocation,
        fulltime,
        limit
    );
});
