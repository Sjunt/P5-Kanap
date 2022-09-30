//Récupération du nombre d'objet présent dans le cache

const cart = []
console.log(cart)

//Affichage du panier
//Si panier vide alors message votre panier est vide :

//    if (cart.length == 0 || cart === null ){
//    document.querySelector("h1").textContent += " est vide";
//}

//Sinon affichage des éléments dans le panier
//Affichage du panier

displayCart()
cart.forEach((item) => displayItem(item))

function displayCart(){
    const numberOfItems = localStorage.length
    //console.log(numberOfItems)
    for (let i = 0; i < numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i))
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
}}  

//Affichage des éléments
function displayItem(item){
    const article = makeArticle(item)
    //console.log(article)
    makeImage(item)
    const cartItemContent = makeCartContent(item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    displayTotalPrice(item)
}

function displayTotalPrice(){
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach(item =>{
        const totalUnitPrice = item.price * item.quantity
        total = total + totalUnitPrice
    })
    //console.log(total)
    totalPrice.textContent = total
}

//Affichage de la div global comprenant l'image + le content
function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}

//Création de la div content comprenant le nom la couleur le prix et la quantité
function makeCartContent(item){
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)
    
    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

//Affichage de la div settings comprenant la quantité
function makeSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

//Ajout de la fonction supprimer dans le panier
function addDeleteToSettings(settings){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

//Ajout de la quantité rattaché a settings
function addQuantityToSettings(settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")

    const p = document.createElement("p")
    p.textContent = "Qté : " 
    quantity.appendChild(p)

    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

//Création de la description comprenant le nom la couleur et le prix
function makeDescription(item){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
  
    return description
}

//Création de l'article global cart item
function makeArticle(item){
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    article.appendChild(makeImage(item))
    return article
}

//Création de la div image
function makeImage(item){
    const div = document.createElement('div')
    div.classList.add("cart__item__img")

    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}