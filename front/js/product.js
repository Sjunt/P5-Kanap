//Récupérer les paramètres de l'URL
//Faisant le lien entre un produit de la page d'acceuil et la page Produit
//Récupérant ainsi l'id du produit a afficher
let params = new URL(window.location.href).searchParams;
let id = params.get('id');

//Création de toutes les variables :
const image = document.getElementsByClassName('item__img');
//let imageUrl = "";
//let imageAlt = "";
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const selectQuantity = document.getElementById('quantity');
const selectColors = document.querySelector("#colors");
selectColors.textContent = colors;

//Requete de l’API pour lui demander l’ensemble des informations pour un ID qui aura été récupéré
//Ajout des données dans les variables
fetch(`http://localhost:3000/api/products/${id}`)
  .then(res => res.json())
  .then(data => {
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    //imageUrl = data.imageUrl;
    //imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;
      
// Implémentation du choix des couleurs
    for (let i = 0; i < data.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("value", data.colors[i]);
        color.innerHTML = data.colors[i];
        colors.appendChild(color);
      }
  })
  
  
//Configuration eventlistner au click
//Générant uniquement l'id la couleur et la quantité
  const addToCart = document.getElementById('addToCart');
  addToCart.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
      id: id,
      color: selectColors.value,
      quantity: selectQuantity.value,
    };
    
// Quantité ne doit pas être égal a 0 sinon message d'erreur
    if (selectQuantity.value <= 0) {
      return alert('Veuillez selectionner une quantité valide')
    }
    
// Insertion des donnés dans le localStorage (parse converti les donnés en objet)
    let ItemInLocalStorage =  JSON.parse(localStorage.getItem('key'));
    
    const addProductLocalStorage = () => {
        ItemInLocalStorage.push(data);
        localStorage.setItem('key', JSON.stringify(ItemInLocalStorage));
    }
    
//Pour vérifier et arrêter
    let addCheck = false;
      
//Si il y a déjà des canapés présent dans le localStorage => 
//Vérification que sa ne fasse pas doublon par rapport a la couleur
    if (ItemInLocalStorage) {
        ItemInLocalStorage.forEach (function (product, key) {
        if (product.id == id && product.color == selectColors.value) {
            ItemInLocalStorage[key].quantity = parseInt(product.quantity) + parseInt(selectQuantity.value);
            localStorage.setItem('key', JSON.stringify(ItemInLocalStorage));
            addCheck = true;      
        }
      });
      
//Opérateur logique NON (Cet opérateur renvoie false si son opérande peut être converti en true ; sinon il renvoie true.)
        if (!addCheck) {
            addProductLocalStorage();
        }   
    }
    
//Si il n'y a aucun canapé présent dans le localStorage => addProduct
    else {
        ItemInLocalStorage = [];
        addProductLocalStorage();
    }

//Redirection vers le panier
    window.location.href = "cart.html"
  });