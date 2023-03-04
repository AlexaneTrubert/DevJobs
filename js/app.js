const inputFormTitle = document.querySelector(".filter-title");
const loadMoreBtn = document.querySelector(".btn-load");

// Ouverture modale au clic sur le bouton filtre
const btnFilter = document.querySelector(".filter");
const modal = document.querySelector(".form-group-modal");

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
})

placeholder();
window.addEventListener("resize", placeholder);

let offsetJob = 0;
function getMoreJobs() {
    getAllJobs(
        offsetJob,
        function(data) {
            offsetJob += 12;
            data.jobs.forEach(jobs => {
                addJobs(jobs.company, jobs.contract, jobs.id, jobs.location, jobs.logo, jobs.logoBackground, jobs.position, jobs.postedAt);
            });
        },
        function () {
            alert("Erreur !");
        }
    );
}

getMoreJobs();

loadMoreBtn.addEventListener("click", getMoreJobs);