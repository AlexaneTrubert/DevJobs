const inputFormTitle = document.querySelector(".filter-title");
const loadMoreBtn = document.querySelector(".btn-load");
const overlay = document.querySelector(".overlay");
let offsetJob = 0;
const mainContent = document.querySelector(".cards-list");
const searchBtn = document.querySelector(".btn-modal");

// Ouverture modale au clic sur le bouton filtre
const btnFilter = document.querySelector(".filter");
const modal = document.querySelector(".form-group-modal");

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

btnFilter.addEventListener("click", function() {
    const open = JSON.parse(btnFilter.getAttribute('aria-expanded'));
    btnFilter.setAttribute('aria-expanded', !open);
    modal.hidden = !modal.hidden;
    overlay.hidden = !overlay.hidden;
})

placeholder();
window.addEventListener("resize", placeholder);

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

form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    mainContent.innerHTML = "";
    offsetJob = 0;

    const text = document.querySelector(".filter-title").value;
    const jobLocation = document.querySelector("#location").value;
    const fulltime = document.querySelector(".checkbox");

    getAllJobs(
        0,
        function(data) {
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
