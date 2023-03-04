const ulCardsJobs = document.querySelector("#cards-job-list");
const template = document.querySelector("#job-card");


function addJobs(company, contract, id, localisation, logo, logoBackground, position, date) {
    const clone = template.content.cloneNode(true);

// mon contenu à cloner
    const h2 = clone.querySelector("h2");
    h2.textContent = position;

    const logoCompany = clone.querySelector("img");
    logoCompany.src += logo;
    logoCompany.style.backgroundColor = logoBackground;

    const meta = clone.querySelector(".meta");
    meta.textContent = date + " \u2022\ " + contract;

    const pCompanyName = clone.querySelector("p");
    pCompanyName.textContent = company

    const address = clone.querySelector(".card-link_location");
    address.textContent = localisation;

    ulCardsJobs.append(clone);
}