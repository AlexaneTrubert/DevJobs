function getAllJobs(offset, onSucess, onError) {
    const request = new XMLHttpRequest();
    request.open("GET", "https://ecf-dwwm.cefim-formation.org/api/jobs?offset=" + offset);
    request.addEventListener("readystatechange", function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                const response = JSON.parse(request.responseText);
                onSucess(response);
            } else {
                onError();
            }
        }
    });
    request.send();
}

function getOneJobs(id, onSucess, onError) {
    const request = new XMLHttpRequest();
    request.open("GET", "https://ecf-dwwm.cefim-formation.org/api/job/" + id);
    request.addEventListener("readystatechange", function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                const response = JSON.parse(request.responseText);
                onSucess(response);
            } else {
                onError();
            }
        }
    });
    request.send();
}