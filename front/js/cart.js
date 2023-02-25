//récupération des canapés du localStorage
var products = []
var basketItems = window.localStorage.getItem('Basketitems');
if (basketItems === null){
  basketItems=[]
}
else{
  basketItems=JSON.parse(basketItems)
}
//récupération du localStorage et des Id sur l'API function => renderBasket
async function renderBasket(){
  for( let i = 0 ; i < basketItems.length; i++ ){
    let res  = await fetch('http://localhost:3000/api/products/'+ basketItems[i].id)    
    let product = await res.json()
    products.push(product)
    console.log(product)
    //  création des Eléments HTML et CSS 
    let cartItem = document.createElement('article')
    // cartItem.innerHTML= product.colors[i]
      document.getElementById('cart__items').appendChild(cartItem)
      cartItem.classList.add('cart__item')
      cartItem.setAttribute("data-id",product._id)
      cartItem.setAttribute("data-color",basketItems[i].color)

    let cartItemImg = document.createElement('div')
      cartItemImg.classList.add('div')
      cartItem.appendChild(cartItemImg)

    let img = document.createElement('img')
      cartItemImg.appendChild(img)
      cartItemImg.classList.add('cart__item__img')
      img.src=product.imageUrl
     img.alt=product.altTxt

    let cartItemContent = document.createElement('div')
      cartItem.appendChild(cartItemContent)
      cartItemContent.classList.add('cart__item__content')

    let cartItemContentDescription = document.createElement('div')
      cartItemContent.appendChild(cartItemContentDescription)
      cartItemContentDescription.classList.add('cart__item__content__description')

    let h2 = document.createElement('h2');
      cartItemContentDescription.appendChild(h2);
      h2.innerHTML=product.name;

    let productColor = document.createElement('p');
      cartItemContentDescription.appendChild(productColor);
      productColor.innerHTML = product.colors[i];

    let productPrice = document.createElement("p");
      productPrice.innerText = `Prix: ${product.price} €`;
      cartItemContentDescription.appendChild(productPrice)

    let cartItemContentSettings = document.createElement('div')
      cartItemContentSettings.classList.add('cart__item__content__settings')
     cartItemContent.appendChild(cartItemContentSettings)

    let cartItemContentSettingsQuantity = document.createElement('div')
      cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity')
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)

    let quantityProduct = document.createElement('p');
      cartItemContentSettingsQuantity.appendChild(quantityProduct);
      quantityProduct.innerHTML="Qté :";
    
    let inputProductQuantity = document.createElement('input')
      cartItemContentSettingsQuantity.appendChild(inputProductQuantity)
      inputProductQuantity.classList.add('itemQuantity')
      inputProductQuantity.value=`${basketItems[i].quantity}`
      inputProductQuantity.setAttribute("type","number");
      inputProductQuantity.setAttribute("name","itemQuantity")
      inputProductQuantity.setAttribute("min","1")
      inputProductQuantity.setAttribute("max","100")  

    let deleteProduct = document.createElement('div')
      cartItemContentSettings.appendChild(deleteProduct)
      deleteProduct.classList.add('cart__item__content__settings__delete')

    let supprimer = document.createElement('p')
      deleteProduct.appendChild(supprimer)
      supprimer.classList.add('deleteItem')
      supprimer.innerText="Supprimer"
  }
renderTotal()
initSupprimer()

initQtyItems()

}
renderBasket()
//création d'une fonction qui trie les produits par id
function sortBasketItems(){
  basketItems.sort(function(a,b){
    if (a.id > b.id){
      return 1
    }
    if (a.id < b.id){
      return -1
    }
    return 0
  })
}
sortBasketItems()

//création d'une fonction qui va initier le bouton supprimer
function initSupprimer(){
  document.querySelectorAll('.deleteItem').forEach( function(button){
    button.addEventListener("click", function(event){
      console.log('suppimer ?')
      let deleteBtn = event.target
      let itemDiv = deleteBtn.closest('article')
      console.log(itemDiv)
      let itemId = itemDiv.dataset.id
      console.log(itemId)
      let itemColor = itemDiv.dataset.color
      console.log(itemId+""+itemColor)
      deleteBasketItems(itemId,itemColor)
      renderTotal();
    })
  })
}
//création d'une fonction qui ve mettre à jour le basketItem en supprimant l'item
//lorsque l'utilisateur va clicker sur le btn"supprimer" 
function deleteBasketItems(id, color) {
  for (let i=0; i < basketItems.length ;i++){
    if (basketItems[i].id == id && basketItems[i].color == color) {
      basketItems.splice(i,1)
      window.localStorage.setItem('Basketitems', JSON.stringify(basketItems))
      document.querySelector(`[data-id="${id}"][data-color="${color}"]`).remove()
      return
    }
  }
}


 //pour chaque changement sur la class .itemQuantity
 function initQtyItems(){
 document.querySelectorAll('.itemQuantity').forEach ((modification)=>{
  modification.addEventListener('change',function(event){
    //Modification des items suite changement attention variables locales
    let modifQtyItems= event.target;
    let itemModifItems=modifQtyItems.closest("article");
    let itemIdModif = itemModifItems.dataset.id
    let itemColorModif = itemModifItems.dataset.color
    let itemQtyModif = modifQtyItems.value
      console.log (itemQtyModif)
      console.log (itemIdModif +""+itemColorModif)
    // mise à jour des items après changement
    deleteBasketQty(itemIdModif,itemColorModif,itemQtyModif)
      renderTotal();
    } )
  })
}

function getPrice(id) {
  for (let i=0; i < products.length ;i++){
    if (products[i]._id == id) {
      console.log(parseFloat(products[i].price))
      return parseFloat(products[i].price)
    }
  }
  return 0
}

function renderTotal() {
  let total = 0;
  let qty = 0
  for (let i=0; i < basketItems.length ;i++){        
    qty += parseInt(basketItems[i].quantity)
    total += parseInt(basketItems[i].quantity) * getPrice(basketItems[i].id)    
  }
  console.log("total: " + total)
  document.getElementById('totalPrice').innerHTML = total
  document.getElementById('totalQuantity').innerHTML = qty
}




//function qui met à jour la quantité et qui supprime l'item si la quantité est à 0
function deleteBasketQty(id, color, quantity){
  for (let i=0; i<basketItems.length; i++){
    if ( basketItems[i].id== id && basketItems[i].color == color){
      basketItems[i].quantity = quantity;
      localStorage.setItem('Basketitems', JSON.stringify(basketItems));
      initQtyItems()
      if (basketItems[i].quantity == 0){
        deleteBasketItems(id, color)
      }
    }
  }
}

  console.log(deleteBasketItems)
  let elts = document.querySelectorAll('.cart__item').forEach(div => {
    if (div.dataset.id == id) {
      div.parentNode.removeChild(div)
      return
    }
  }) 
  // recalculer le total
  
renderTotal()
// function qui initialise les données du client au click sur le bouton "commander"
function initClick(){
  console.log("initClick début")
  //assignation de l'iD à un element du HTML
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');
  console.log("name: "+firstName.value)
  //création d'un tableau qui va contenir les id des produits du basketItems
  let productsId = []
  for (let i=0; i< basketItems.length; i++){
    productsId.push(basketItems[i].id)
    console.log("basketItems: "+basketItems[i].id)
  }
  //création d'un objet qui va contenir les données du client
  const client = {
    firstName : firstName.value,
    lastName  : lastName.value,
    address   : address.value,
    city      : city.value,
    email     : email.value,
    products : productsId,
  }
  //transformation de l'objet en string
  const clientData = JSON.stringify(client);
  console.log("clientData: "+clientData)
  //si le formulaire est vide, on affiche un message d'erreur et on bloque l'envoi des données
  if (firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" || email.value == ""){
    alert("Veuillez remplir le formulaire")
    console.log("formulaire vide")
    return
  
  }
  //sinon on envoie les données du client au serveur
   else {submitOrder().then (clientData =>{
    clientData;
 })
     // Envoi des données du client au serveur
     alert(1)
     console.log("envoi données au serveur")
     alert(2)
    async function submitOrder(){
      alert(3)
    console.log("submitOrder début")
    let res = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json',

        'Content-Type': 'application/json'
      },
      body: clientData,
    })
    alert(4)
    //récupération de la réponse du serveur
    const orderId= await res.json()
    console.log("confirm: "+confirm)
    //récupération de l'id de la commande
    //récupération de l'id de la commande window.location.replace("./confirmation.html?orderId=" +confirm.orderId); 
    window.location.replace("./confirmation.html?orderId=" +orderId);   
     localStorage.clear();
   console.log("json content: "+ res)
    return res;
   
    //return content <-- SUR INTERNET, content est retourné 
  }

  
 
} 

//submitOrder().
//


console.log("submitOrder fin3")
}

//initialisation de la fonction initClick au click sur le bouton "commander"
 document.getElementById('order').addEventListener("click", initClick)