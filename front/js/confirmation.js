//On récupère l'id 
const orderId = new URL(location.href).searchParams.get("orderId")
//On affiche le numéro de commande
document.getElementById("orderId").textContent= `${orderId}`;
//console.log(orderId);
//On clear le localstorage
function clearStorage(){
    localStorage.removeItem("key")
}
clearStorage();


