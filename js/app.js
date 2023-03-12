const inputFormTitle = document.querySelector(".filter-title");
const loadMoreBtn = document.querySelector(".btn-load");
const overlay = document.querySelector(".overlay");
let offsetJob = 0;
const mainContent = document.querySelector(".cards-list");
const btnFilter = document.querySelector(".filter");
const text = document.querySelector(".filter-title").value;
const jobLocation = document.querySelector("#location").value;
const fulltime = document.querySelector(".checkbox");


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
btnFilter.addEventListener("click", modalState);
overlay.addEventListener("click", modalState);
placeholder();
window.addEventListener("resize", placeholder);