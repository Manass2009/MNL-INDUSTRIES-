/* =========================================================
   MNL-INDUSTRIES
   APP.JS — Système principal du site
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const MNL_CONFIG = {
    brand: "MNL-INDUSTRIES",
    founder: "Manassé Ntambwa",
    currency: "USD",

    categories: [
        "Tous",
        "Automobile",
        "Moto",
        "Aéronautique",
        "Drone",
        "Concept"
    ]
};


/* =========================================================
   CATALOGUE MNL
   =========================================================
   Tu pourras ajouter de nouveaux modèles ici sans modifier
   toute la structure du site.
   ========================================================= */

const MNL_MODELS = [

    {
        id: "m0",
        name: "MNL M.0",
        category: "Concept",
        type: "Automobile",
        image: "MNL M.0.png",

        status: "Concept",

        description:
            "Premier concept fondateur de la nouvelle génération MNL. " +
            "Une vision expérimentale destinée à explorer de nouvelles formes automobiles.",

        technology: [
            "Architecture expérimentale",
            "Habitacle nouvelle génération",
            "Interface numérique MNL",
            "Design aérodynamique"
        ]
    },

    {
        id: "m1",
        name: "MNL M1",
        category: "Automobile",
        type: "Voiture",

        image: "MNL M1.png",

        status: "Concept",

        description:
            "Une automobile sportive futuriste développée autour de l'identité MNL.",

        technology: [
            "Propulsion électrique expérimentale",
            "Architecture basse",
            "Cockpit numérique",
            "Système intelligent MNL"
        ]
    },

    {
        id: "m2",
        name: "MNL M2",
        category: "Automobile",
        type: "Voiture",

        image: "MNL M2 .jpg",

        status: "Concept",

        description:
            "Un modèle MNL orienté performance, combinant élégance, puissance et technologie.",

        technology: [
            "Transmission intelligente",
            "Aérodynamique active",
            "Habitacle connecté",
            "Assistance intelligente"
        ]
    },

    {
        id: "m3",
        name: "MNL M3",
        category: "Automobile",
        type: "Voiture",

        image: "MNL M3.png",

        status: "Concept",

        description:
            "Une vision plus agressive et sportive de l'univers automobile MNL.",

        technology: [
            "Structure légère",
            "Gestion électronique avancée",
            "Aérodynamique optimisée",
            "Interface MNL"
        ]
    },

    {
        id: "m6",
        name: "MNL M6",
        category: "Automobile",
        type: "Voiture",

        image: "MNL M6.png",

        status: "Concept",

        description:
            "Le grand modèle MNL destiné à représenter le sommet de la gamme automobile.",

        technology: [
            "Architecture premium",
            "Propulsion nouvelle génération",
            "Intelligence embarquée",
            "Confort intelligent"
        ]
    },

    {
        id: "mnl-pm",
        name: "MNL PM",
        category: "Concept",
        type: "Prototype",

        image: "MNL PM.png",

        status: "Prototype",

        description:
            "Prototype expérimental permettant à MNL-INDUSTRIES d'explorer de nouvelles technologies.",

        technology: [
            "Plateforme expérimentale",
            "Système modulaire",
            "Technologies autonomes",
            "Laboratoire roulant"
        ]
    }

];


/* =========================================================
   UTILITAIRES
   ========================================================= */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MNL-INDUSTRIES : système initialisé.");

    initializeNavigation();
    initializeButtons();
    initializeScrollEffects();
    initializeImageEffects();

    /*
     * Si ton HTML contient un conteneur #models-grid,
     * le catalogue sera automatiquement affiché.
     */
    renderModels();

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const links = $$("[data-section]");

    links.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const targetId =
                link.getAttribute("data-section");

            const target =
                document.getElementById(targetId);

            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   BOUTONS
   ========================================================= */

function initializeButtons() {

    /*
     * Tous les boutons possédant :
     *
     * data-model="m1"
     *
     * ouvriront automatiquement la fiche correspondante.
     */

    $$("[data-model]").forEach(button => {

        button.addEventListener("click", () => {

            const id =
                button.getAttribute("data-model");

            openModel(id);

        });

    });

}


/* =========================================================
   AFFICHAGE DU CATALOGUE
   ========================================================= */

function renderModels(filter = "Tous") {

    const container = $("#models-grid");

    if (!container) return;

    container.innerHTML = "";

    const models =
        filter === "Tous"
            ? MNL_MODELS
            : MNL_MODELS.filter(model =>
                model.category === filter
            );

    if (models.length === 0) {

        container.innerHTML = `
            <div class="mnl-empty">
                <h3>Aucun modèle disponible</h3>
                <p>
                    Cette catégorie est actuellement
                    en développement chez MNL-INDUSTRIES.
                </p>
            </div>
        `;

        return;
    }


    models.forEach(model => {

        const card =
            document.createElement("article");

        card.className = "mnl-model-card";

        card.innerHTML = `

            <div class="mnl-model-image">

                <img
                    src="${model.image}"
                    alt="${model.name}"
                    loading="lazy"
                >

                <span class="mnl-status">
                    ${model.status}
                </span>

            </div>

            <div class="mnl-model-content">

                <span class="mnl-model-type">
                    ${model.type}
                </span>

                <h3>
                    ${model.name}
                </h3>

                <p>
                    ${model.description}
                </p>

                <button
                    class="mnl-model-button"
                    onclick="openModel('${model.id}')"
                >
                    Découvrir le modèle →
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


/* =========================================================
   FILTRAGE DES MODÈLES
   ========================================================= */

function filterModels(category) {

    renderModels(category);

}


/* =========================================================
   FICHE DÉTAILLÉE D'UN MODÈLE
   ========================================================= */

function openModel(modelId) {

    const model =
        MNL_MODELS.find(item =>
            item.id === modelId
        );

    if (!model) {

        console.warn(
            "Modèle MNL introuvable :",
            modelId
        );

        return;
    }


    let modal =
        $("#mnl-model-modal");


    /*
     * Création automatique de la fenêtre
     * si elle n'existe pas encore dans le HTML.
     */

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id = "mnl-model-modal";

        modal.className =
            "mnl-modal";

        document.body.appendChild(modal);

    }


    modal.innerHTML = `

        <div class="mnl-modal-overlay"
             onclick="closeModel()">
        </div>

        <div class="mnl-modal-window">

            <button
                class="mnl-modal-close"
                onclick="closeModel()">
                ×
            </button>

            <div class="mnl-modal-image">

                <img
                    src="${model.image}"
                    alt="${model.name}"
                >

            </div>

            <div class="mnl-modal-info">

                <span class="mnl-model-type">
                    ${model.type}
                </span>

                <h2>
                    ${model.name}
                </h2>

                <span class="mnl-status">
                    ${model.status}
                </span>

                <p>
                    ${model.description}
                </p>

                <h3>
                    Technologies explorées
                </h3>

                <ul>

                    ${model.technology.map(item => `
                        <li>${item}</li>
                    `).join("")}

                </ul>

                <div class="mnl-concept-warning">

                    ⚠️ CONCEPT MNL

                    <br>

                    Ce véhicule représente une
                    vision expérimentale de
                    MNL-INDUSTRIES.

                </div>

            </div>

        </div>

    `;


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   FERMETURE FICHE
   ========================================================= */

function closeModel() {

    const modal =
        $("#mnl-model-modal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   EFFETS AU DÉFILEMENT
   ========================================================= */

function initializeScrollEffects() {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "mnl-visible"
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    $$(".mnl-reveal").forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   EFFETS SUR LES IMAGES
   ========================================================= */

function initializeImageEffects() {

    $$("img").forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image MNL introuvable :",
                    image.src
                );

            }
        );

    });

}


/* =========================================================
   CLAVIER
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModel();

        }

    }
);


/* =========================================================
   RECHERCHE MNL
   ========================================================= */

function searchModels(query) {

    const container =
        $("#models-grid");

    if (!container) return;

    const search =
        query.toLowerCase().trim();


    if (!search) {

        renderModels();

        return;

    }


    const results =
        MNL_MODELS.filter(model =>

            model.name
                .toLowerCase()
                .includes(search)

            ||

            model.type
                .toLowerCase()
                .includes(search)

            ||

            model.category
                .toLowerCase()
                .includes(search)

        );


    container.innerHTML = "";


    results.forEach(model => {

        const card =
            document.createElement("article");

        card.className =
            "mnl-model-card";


        card.innerHTML = `

            <div class="mnl-model-image">

                <img
                    src="${model.image}"
                    alt="${model.name}"
                >

            </div>

            <div class="mnl-model-content">

                <span>
                    ${model.type}
                </span>

                <h3>
                    ${model.name}
                </h3>

                <p>
                    ${model.description}
                </p>

                <button
                    onclick="openModel('${model.id}')"
                    class="mnl-model-button"
                >
                    Découvrir →
                </button>

            </div>

        `;


        container.appendChild(card);

    });


    if (results.length === 0) {

        container.innerHTML = `

            <div class="mnl-empty">

                <h3>
                    Aucun résultat
                </h3>

                <p>
                    Aucun modèle MNL ne correspond
                    à ta recherche.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   EXPORT GLOBAL
   =========================================================
   Permet aux boutons HTML d'utiliser directement
   les fonctions.
   ========================================================= */

window.MNL_MODELS = MNL_MODELS;

window.renderModels = renderModels;
window.filterModels = filterModels;
window.openModel = openModel;
window.closeModel = closeModel;
window.searchModels = searchModels;


/* =========================================================
   MESSAGE CONSOLE
   ========================================================= */

console.log(`
╔══════════════════════════════════════╗
║          MNL-INDUSTRIES              ║
║                                      ║
║   SYSTEM ONLINE                      ║
║   DESIGN LAB ONLINE                  ║
║   MODEL DATABASE ONLINE              ║
║                                      ║
║   Founder: Manassé Ntambwa           ║
╚══════════════════════════════════════╝
`);
