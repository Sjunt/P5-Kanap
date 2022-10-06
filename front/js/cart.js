//Requete de l’API pour récupérer les éléments hors localStorage
async function searchItems() {
    return fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => data) 
}
  
// Fonction get pour récupérer les canapés présents dans le localStorage
// Si localStorage vide alors affichage du message "votre panier est vide" + pas de TT
// Sinon il retourne les données en parse du localStorage
  function getCart() {
    let itemInLocalStorage = localStorage.getItem('key');
    if (itemInLocalStorage == null) {
        document.querySelector("h1").textContent += " est vide";
        document.querySelector("p").textContent = "";
        return [];
    } else {
      return JSON.parse(itemInLocalStorage);
    }
}
 
//Récupération des données de l'API
//La const products attends d'avoir les informations pour chaque canapés
//La const product synchronise les données entre l'API et le localStorage
//Affichage des produits
async function checkApi() {
    const products = await searchItems();
    for (let productsFromStorage of getCart()) {
        console.log(productsFromStorage)
        const product = products.filter(item => item._id === productsFromStorage.id);
        console.log(product)
        displayProducts(product[0], productsFromStorage);
    }
    return
}

checkApi()

//Affichage des produits
function displayProducts(products, productsFromStorage) {
    let cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");  
    document.querySelector("#cart__items").appendChild(cartArticle)
    cartArticle.innerHTML = `
    <div class="cart__item__img">
      <img src=${products.imageUrl} alt=${products.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${products.name}</h2>
        <p>${productsFromStorage.color}</p>
        <p>${products.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number"
          class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productsFromStorage.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    `
  }
  
