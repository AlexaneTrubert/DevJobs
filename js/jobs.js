const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const jobId = urlParams.get('id');

getOneJobs(jobId, function (data) {
        addItem(data);
    },
    function () {
        alert("Erreur !");
    }
);