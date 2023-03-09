const inputFormTitle = document.querySelector(".filter-title");
const loadMoreBtn = document.querySelector(".btn-load");
const overlay = document.querySelector(".overlay");

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
    overlay.hidden = !overlay.hidden;
})

placeholder();
window.addEventListener("resize", placeholder);

let offsetJob = 0;
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
        loadMoreBtn
    );
}
getMoreJobs();
loadMoreBtn.addEventListener("click", getMoreJobs);
