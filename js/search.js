// Champs moteur de recherche
const form = document.querySelector(".main-form");
const limit = 12;

// Formulaire de recherche
form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    mainContent.innerHTML = "";
    let offsetJob = 0;

    const text = document.querySelector(".filter-title").value;
    const jobLocation = document.querySelector("#location").value;
    const fulltime = document.querySelector(".checkbox");

    getAllJobs(
        offsetJob,
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