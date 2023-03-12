function getAllJobs(offset, onSucess, onError, loadMoreBtn, text, jobLocation, fulltime, limit) {
    if(fulltime.checked === true) {
        fulltime = 1;
    }else {
        fulltime = 0;
    }
    const request = new XMLHttpRequest();
    request.open("GET",
        "https://ecf-dwwm.cefim-formation.org/api/jobs/search?offset=" + offset + "&text=" + text + "&location=" + jobLocation + "&fulltime=" + fulltime + "&limit=" + limit);
    request.addEventListener("readystatechange", function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            loadMoreBtn.disabled = false;
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                onSucess(response);
                if (offsetJob >= response.total) {
                    loadMoreBtn.textContent = "No more data";
                    loadMoreBtn.className = "btn btn-load btn-disabled";
                    loadMoreBtn.disabled = true;
                } else {
                    loadMoreBtn.textContent = "Load More";
                }
            } else {
                onError();
            }
        }
    });
    request.send();
    loadMoreBtn.textContent = "Loading...";
    loadMoreBtn.disabled = true;
}

function getOneJobs(id, onSucess, onError) {
    const request = new XMLHttpRequest();
    request.open("GET", "https://ecf-dwwm.cefim-formation.org/api/job/" + id);
    request.addEventListener("readystatechange", function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                onSucess(response);
            } else {
                onError();
            }
        }
    });
    request.send();
}