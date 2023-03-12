function addJobs(company, contract, id, localisation, logo, logoBackground, position, date) {
    const ulCardsJobs = document.querySelector("#cards-job-list");
    const template = document.querySelector("#job-card");
    const clone = template.content.cloneNode(true);
    const datePost = timestamp(date);

// mon contenu à cloner
    const h2 = clone.querySelector("h2");
    h2.textContent = position;

    const logoCompany = clone.querySelector("img");
    logoCompany.src += logo;
    logoCompany.style.backgroundColor = logoBackground;

    const meta = clone.querySelector(".meta");
    meta.textContent = datePost + " \u2022\ " + contract;

    const pCompanyName = clone.querySelector("p");
    pCompanyName.textContent = company

    const address = clone.querySelector(".card-link_location");
    address.textContent = localisation;
    address.addEventListener("click", function () {
        let offsetJob = 0;
        getJobsFromCountry(offsetJob, localisation, loadMoreBtn, function (data) {
            mainContent.innerHTML="";
                data.jobs.forEach(jobs => {
                    offsetJob += data.jobs.length;
                    addJobs(jobs.company, jobs.contract, jobs.id, jobs.location, jobs.logo, jobs.logoBackground, jobs.position, jobs.postedAt);
                });
            },
            function () {
                alert("Erreur !");
            })
    })

    const urlDetail = clone.querySelector("#linkToDetail");
    urlDetail.href = "item.html?id=" + id;

    ulCardsJobs.append(clone);
}

function addItem(data) {
    const mainContent = document.querySelector(".item-container");
    const mainFooter = document.querySelector(".footer-container");
    const templateFooter = document.querySelector("#template-footer");
    const cloneFooter = templateFooter.content.cloneNode(true);
    const template = document.querySelector("#item_template");
    const clone = template.content.cloneNode(true);
    const datePost = timestamp(data.postedAt);

    // Le main content à cloner
    const h2 = clone.querySelector("h2");
    h2.textContent = data.company;

    const entrepriseWebsite = clone.querySelector("#title-entreprise");
    entrepriseWebsite.textContent = data.company + ".com";

    const urlEntreprise = clone.querySelector(".btn-compagny-site");
    urlEntreprise.href = data.website;

    const logoEntreprise = clone.querySelector(".logo-card-item");
    logoEntreprise.src += data.logo;
    logoEntreprise.style.backgroundColor = data.logoBackground;

    const meta = clone.querySelector(".meta-item");
    meta.textContent = datePost + " \u2022\ " + data.contract;

    const h3 = clone.querySelector("h3");
    h3.textContent = data.position;

    const country = clone.querySelector(".country-link");
    country.textContent = data.location;

    const applyBtnHeader = clone.querySelector(".btn-item-apply");
    applyBtnHeader.href = data.apply;

    const description = clone.querySelector("#description");
    description.textContent = data.description;

    const requirements = clone.querySelector("#requirements");
    requirements.textContent = data.requirements.content;

    const role = clone.querySelector("#role");
    role.textContent = data.role.content;

    // Ici on voit pour les listes qu'on ne peut pas gérer avec le clone template
    const ul = clone.querySelector("#requirements-list");
    data.requirements.items.forEach(requirements => {
        let li = document.createElement("li");
        li.textContent = requirements;
        ul.appendChild(li);
    })

    const ol = clone.querySelector("#role-list");
    data.role.items.forEach(role => {
        let li = document.createElement("li");
        li.textContent = role;
        ol.appendChild(li);
    })

    mainContent.appendChild(clone);

    // Le footer à cloner
    const h3Footer = cloneFooter.querySelector("h3");
    h3Footer.textContent = data.position;

    const linkFooter = cloneFooter.querySelector(".btn-footer");
    linkFooter.src = data.apply;

    mainFooter.appendChild(cloneFooter);
}