const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const jobId = urlParams.get('id');

getOneJob(jobId, function (data) {
        addItem(data);
    },
    function () {
        alert("Erreur !");
    }
);


