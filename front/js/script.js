//Requete de l’API pour lui demander l’ensemble des produits
//la reponse transforme les produits en json et on la nomme product

fetch('http://localhost:3000/api/products')
    .then(function(response) {
        return response.json();
    })
    .then(function(product) {
        for (let item in product) {
        document.querySelector("#items").innerHTML += addProducts(product[item]);
    }
})



//Insérer chaque élément de chaque produit dans la page d’accueil (dans le DOM).
//Tout en spécifiant l'ID !!!!!
function addProducts(e) {
    return `
        <a href="./product.html?id=${e._id}">
            <article>
              <img src="${e.imageUrl}" alt="${e.altTxt}">
              <h3 class="productName">${e.name}</h3>
              <p class="productDescription">${e.description}</p>
              <p class="productPrice">${e.price}€</p>
            </article>
        </a>
    `;
}
        
