//Requete de l’API pour récupérer les éléments hors localStorage
async function searchItems() {
    return fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => data) 
}

let itemInLocalStorage = JSON.parse(localStorage.getItem('key'));

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
        //console.log(itemInLocalStorage)
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
        //console.log(productsFromStorage)
        const product = products.filter(item => item._id === productsFromStorage.id);
        //console.log(product)
        displayProducts(product[0], productsFromStorage);
    }
}


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
        <p class="deleteItem">Supprimer</p>        </div>
      </div>
    </div>
    `
}


//Modification de la quantité dans le panier directement
//La valeur du bouton est reprise et ajouté au localstorage
//Mise a jour du localstorage + reload
function changeQuantityCart(){
  let btn_quantity = document.querySelectorAll('.itemQuantity')
  //console.log(btn_quantity);
  for (let q = 0; q < btn_quantity.length; q++){
    btn_quantity[q].addEventListener('change', () => {
      let qtyModify = parseInt(btn_quantity[q].value, 10);
      //console.log(qtyModify);
      itemInLocalStorage[q].quantity = qtyModify;
      localStorage.setItem('key', JSON.stringify(itemInLocalStorage));

      alert("La quantité d'un article vient d'être modifié dans le panier")
      location.reload();
    });
  }
}

//Ajout de l'event suppresion d'un article dans le panier au clique
//Splice modifie le contenu du tableau en retirant l'élément
//Mise a jour du localstorage + reload
function deleteItem(){
  let btn_delete = document.querySelectorAll('.deleteItem');
  //console.log(btn_delete);
  for (let a = 0; a < btn_delete.length; a++) {
    btn_delete[a].addEventListener('click', () => { 
      itemInLocalStorage.splice(a, 1);
      localStorage.setItem('key', JSON.stringify(itemInLocalStorage));
      
      alert("Un article vient d'être supprimé du panier");
      location.reload();
    });
  }
}

//Calcul du prix total du panier 
async function totalPriceCart(){
  let cart = await searchItems();
  let showCart = getCart();
  let totalPrice = 0;
  for (let i in showCart){
    for (let p in cart){
      const price = cart[p].price;
      const id = cart[p]._id;

      if (id === showCart[i].id){
        totalPrice += showCart[i].quantity * price
        //console.log(totalPrice)
      }
    }
  }
  return totalPrice
}
//Affichage du prix total du panier
async function displayTotalPrice(){
document.querySelector("#totalPrice").innerHTML = await totalPriceCart();
}


//Ajout de la quantité total d'article
function totalProducts() {
  let totalArticles = 0;
  for ( let a = 0; a < itemInLocalStorage.length; a++) {
   const productQuantity = parseInt(itemInLocalStorage[a].quantity, 10);
 
   totalArticles += productQuantity;
 
   const totalQuantity = document.getElementById('totalQuantity');
   totalQuantity.textContent = totalArticles;
 }
}


///////////////////Passer la commande////////////////////////
//Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type
//de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un
//prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En
//cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ
//correspondant.

//Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
//lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un
//array de strings product-ID. Les types de ces champs et leur présence doivent être validés
//avant l’envoi des données au serveur.




//Fonction asynchrone "main" pour appeler les fonctions
async function main() {
    await checkApi();
    totalProducts();
    displayTotalPrice();
    getCart();
    deleteItem();
    changeQuantityCart()
}

//Appel de la fonction "main" principale
main();