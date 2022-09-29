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
    const {imageUrl, altTxt, colors, name, price, description} = kanap
    addImage(imageUrl, altTxt)
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    addName(name)
    addPrice(price)
    itemPrice = price
    addDescription(description)
    addColors(colors)
}

//Génération de toutes les petites fonctions qui rempliront la card produit
function addImage(imageUrl, altTxt){
    const imgItem = document.createElement("img");
    imgItem.src = imageUrl;
    imgItem.alt = altTxt;
    const parent = document.querySelector(".item__img")
    parent.appendChild(imgItem);
}

function addName(name){
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

function addPrice(price){
    const span = document.querySelector("#price")
    span.textContent = price
}

function addDescription(description){
    const p = document.querySelector("#description")
    p.textContent = description
}

function addColors(colors){
    const select = document.querySelector("#colors")
    select.textContent = colors
    //console.log(colors)
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
        //console.log(option)
    })
}


//Ajout des éléments séléctionnés dans la page produit vers le localStorage
//LocalStorage stock l'id la couleur l'image le prix et la quantité / Qte ne doit pas être égal a 0
//Redirection après l'ajout au panier vers la page panier / Si erreur alors pas de redirection
//A refactorer 

const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if(quantity == 0){
        alert("Please select quantity")
        return
    }

    const data = {
        id: id,
        name : articleName,
        color: color,
        quantity: quantity,
        price: itemPrice,
        altTxt: altText,
        imageUrl : imgUrl
    }
    localStorage.setItem(id, JSON.stringify(data))
    window.location.href = "cart.html"
})
