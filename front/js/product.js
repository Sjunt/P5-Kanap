//Récupérer les paramètres de l'URL
//Faisant le lien entre un produit de la page d'acceuil et la page Produit
//Récupérant ainsi l'id du produit a afficher
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//console.log({ id })

//Requete de l’API pour lui demander l’ensemble des informations pour un ID qui aura été récupéré depuis la page d'acceuil
fetch(`http://localhost:3000/api/products/${id}`)
    .then ((response) => response.json())
    .then ((data) => createCard(data))


//Fonction global qui sera toujours reprise dans le fetch
//Génère toutes les constantes pour la création de la card page produit
function createCard(kanap){
    //console.log(kanap)
    const {imageUrl, altTxt, colors, name, price, _id, description} = kanap
    addImage(imageUrl, altTxt)
    addName(name)
    addPrice(price)
    addDescription(description)
    addColors(colors)
}

//Génération de toutes les petites fonctions qui rempliront la card produit
function addImage(imageUrl, altTxt){
    const imgItem = document.createElement("img");
    imgItem.src = imageUrl;
    imgItem.alt = altTxt;
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(imgItem);
}

function addName(name){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function addPrice(price){
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function addDescription(description){
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

function addColors(colors){
    const select = document.querySelector("#colors")
    if (select != null) select.textContent = colors
    //console.log(colors)
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
        //console.log(option)
    })
}


//Ajouter des produits dans le panier
// ID , Quantité , Couleur , Prix total ?
//Utiliser array / localstorage
//Si produit identique (meme couleur) alors +1 qte