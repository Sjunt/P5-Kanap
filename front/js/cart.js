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


//Configuration des champs de contact
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let address = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');

  

//Configuration des RegExp
let nameRegExp = /^[a-zéêëèîïâäçùA-Z]+$/;
let addressRegExp = /^[A-Za-z0-9éêëèîïâäçù ,'-]+$/
let cityRegExp = /^[a-zéèàôâA-ZÉÀ'-]{2,30}$/;
let emailRegExp = /^[A-Za-z0-9._-]+[@][A-Za-z]+[.][a-z]{2,4}$/


//Configuration firstName
// Eventlistener qui check la config durant l'input
function checkFirstName() {
  let testFirstName = nameRegExp.test(firstName.value);
  if (testFirstName == true) {
    firstNameErrorMsg.innerText = "";
    return true;
  } else {
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
    firstNameErrorMsg.innerText = "Merci de saisir un prénom valide (pas de caractères spéciaux) exemple : Jason"
    return false;
  }
}
firstName.addEventListener("input", function() {
  checkFirstName(firstName);
});


//Configuration lastName
function checkLastName() {
  let testLastName = nameRegExp.test(lastName.value);
  if (testLastName == true) {
    lastNameErrorMsg.innerText = "";
    return true;   
  } else {
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
    lastNameErrorMsg.innerText = "Merci de saisir un nom valide (pas de caractères spéciaux) exemple : Simon"
    return false;
  }
}
// Eventlistener qui check la config durant l'input
lastName.addEventListener("input", function () {
  checkLastName(lastName);
});



//Configuration address
function checkAddress() {
  let testAddress = addressRegExp.test(address.value);
  if (testAddress == true) {
    addressErrorMsg.innerText = "";
    return true;
  } else {
    let addressErrorMsg = document.getElementById('addressErrorMsg')
    addressErrorMsg.innerText = "Merci de saisir une adresse valide (pas de caractères spéciaux) exemple : 1 Avenue des frelons"
    return false;
  }
}
// Eventlistener qui check la config durant l'input
address.addEventListener("input", function () {
  checkAddress(address);
});


//Configuration city
function checkCity() {
  let testCity = cityRegExp.test(city.value);
  if (testCity == true) {
    cityErrorMsg.innerText = "";
    return true;
  } else {
    let cityErrorMsg = document.getElementById('cityErrorMsg')
    cityErrorMsg.innerText = "Merci de saisir une ville valide (pas de caractères spéciaux) exemple : Saint-Louis"
    return false;
  }
}
// Eventlistener qui check la config durant l'input
city.addEventListener("input", function () {
  checkCity(city);
});


//Configuration email
function checkEmail() {
  let testEmail = emailRegExp.test(email.value);
  if (testEmail == true) {
    emailErrorMsg.innerText = "";
    return true;
  } else {
    let emailErrorMsg = document.getElementById('emailErrorMsg')
    emailErrorMsg.innerText = "Merci de saisir un email valide (pas de caractères spéciaux) exemple : jason.simon@gmail.fr"
    return false;
  }
}
// Eventlistener qui check la config durant l'input
email.addEventListener("input", function () {
  checkEmail(email);
});


//Envoi du formulaire au clique sur boutton commander si toutes les informations ont été validées
//boucle for qui récupere les id et les push dans l'array
function postForm() {
  const button_order = document.querySelector('#order')
  button_order.addEventListener("click", function (e) {
    e.preventDefault();
    if (checkFirstName(firstName) && checkLastName(lastName) && checkAddress(address) && checkCity(city) && checkEmail(email) ){
      let productId = JSON.parse(localStorage.getItem("key"));
      //console.log(productId);
      const arrayId = [];
      for (let i in productId) {
        arrayId.push(productId[i].id);
      }

//Création de contactOrder regroupant le formulaire saisie par le client et les id produits
      const contactOrder = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: arrayId,
      };
      console.log(contactOrder);
//Méthode POST pour envoyer le formulaire
      let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactOrder),
      };
      fetch('http://localhost:3000/api/products/order', options)      
        .then(res => res.json())
        //redirection sur la page confirmation        
        .then(data => { document.location.href = `./confirmation.html?orderId=${data.orderId}`;})
    } else {
      alert("Veuillez remplir le formulaire de commande pour continuer");
      e.preventDefault();
    }
  })
}

//Fonction asynchrone "main" pour appeler les fonctions
async function main() {
  await checkApi();
  totalProducts();
  displayTotalPrice();
  getCart();
  deleteItem();
  changeQuantityCart();
  postForm();
}

//Appel de la fonction "main" principale
main();
