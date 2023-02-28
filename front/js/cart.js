//récapitulatif des produits dans le panier
// création d'un tableau vide pour stocker les produits  du panier 
var products = []
// on récupère les données du panier dans le localStorage
var basketItems = window.localStorage.getItem('Basketitems');
// si le panier est vide, on initialise le tableau basketItems
if (basketItems === null){
    basketItems=[]
}
else{ // sinon on parse les données du panier pour les transformer en tableau d'objets 
  basketItems=JSON.parse(basketItems)
}
//  affichage des canapés dans le panier
// Création d'une fonction asynchrone pour afficher les produits du panier 
async function renderBasket(){
  //Boucle pour afficher les produits du panier 
  
  for( let i = 0 ; i < basketItems.length; i++ ){
    // on récupère les données des produits du localStorage  dans l'API 
    let res  = await fetch('http://localhost:3000/api/products/'+ basketItems[i].id) 
    // on récupère les données au format json    
    let product = await res.json()
    // on ajoute les produits au tableau products 
    products.push(product)
    // on affiche les données dans la console
    console.log(product)

    // on affiche les données dans la page html 
    //  création des Eléments HTML et CSS pour afficher les produits dans le panier

    // création de la div cart__items  
    let cartItem = document.createElement('article')
      //cartItem.innerHTML= product.colors[i]
      document.getElementById('cart__items').appendChild(cartItem)
      // on ajoute la classe cart__item à la div cart__items
      cartItem.classList.add('cart__item')
      // on ajoute l'id du produit à la ID cart__items
      cartItem.setAttribute("data-id",product._id)
      // on ajoute la couleur du produit à la ID cart__items
      cartItem.setAttribute("data-color",basketItems[i].color)

      // création de la div cart__item__img
    let cartItemImg = document.createElement('div')
      // on ajoute la classe cart__item__img à la div cart__item__img
      cartItemImg.classList.add('div')
      cartItem.appendChild(cartItemImg)

    // création de l'image du produit
    let img = document.createElement('img')
      cartItemImg.appendChild(img)
      cartItemImg.classList.add('cart__item__img')
      img.src=product.imageUrl
      img.alt=product.altTxt

    // création de la div cart__item__content
    let cartItemContent = document.createElement('div')
      cartItem.appendChild(cartItemContent)
      cartItemContent.classList.add('cart__item__content')

    // création de la classe cart__item__content__description
    let cartItemContentDescription = document.createElement('div')
      cartItemContent.appendChild(cartItemContentDescription)
      cartItemContentDescription.classList.add('cart__item__content__description')

    // création du nom du produit h2
    let h2 = document.createElement('h2');
      cartItemContentDescription.appendChild(h2);
      h2.innerHTML=product.name;

      // création de la couleur du produit html p
    let productColor = document.createElement('p');
      cartItemContentDescription.appendChild(productColor);
      productColor.innerHTML = product.colors[i];

      // création du prix du produit html p
    let productPrice = document.createElement("p");
      productPrice.innerText = `Prix: ${product.price} €`;
      cartItemContentDescription.appendChild(productPrice)

      // création de la classe cart__item__content__settings
    let cartItemContentSettings = document.createElement('div')
      cartItemContentSettings.classList.add('cart__item__content__settings')
     cartItemContent.appendChild(cartItemContentSettings)
 
      // création de la classe  cart__item__content__settings__quantity
    let cartItemContentSettingsQuantity = document.createElement('div')
      cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity')
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)

      // création de la quantité du produit html p
    let quantityProduct = document.createElement('p');
      cartItemContentSettingsQuantity.appendChild(quantityProduct);
      quantityProduct.innerHTML="Qté :";
    
      // création de la classe pour la quantité du produit
    let inputProductQuantity = document.createElement('input')
      cartItemContentSettingsQuantity.appendChild(inputProductQuantity)
      inputProductQuantity.classList.add('itemQuantity')
      // on ajoute la quantité du produit au input de la classe quantité du produit
      inputProductQuantity.value=`${basketItems[i].quantity}`
      // on ajoute les attributs au input de la classe quantité du produit
      inputProductQuantity.setAttribute("type","number");
      inputProductQuantity.setAttribute("name","itemQuantity")
      inputProductQuantity.setAttribute("min","1")
      inputProductQuantity.setAttribute("max","100")  

      // création de la classe cart__item__content__settings__delete
    let deleteProduct = document.createElement('div')
      cartItemContentSettings.appendChild(deleteProduct)
      deleteProduct.classList.add('cart__item__content__settings__delete')

    let supprimer = document.createElement('p')
      deleteProduct.appendChild(supprimer)
      supprimer.classList.add('deleteItem')
      supprimer.innerText="Supprimer"
  }
  //
renderTotal()
//on appelle la fonction qui va initialiser  le bouton supprimer 
//pour mettre à jour le prix total et le panier
initSupprimer()
//  on appelle la fonction qui va initialiser la quantité des produits pour 
//mettre à jour le prix total 
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
// on appelle la fonction qui trie les produits par id
sortBasketItems()
//
//création d'une fonction qui va initier le bouton supprimer 
function initSupprimer(){
  // on récupère le bouton supprimer
  document.querySelectorAll('.deleteItem').forEach( function(button){
    // on ajoute un écouteur d'événement au bouton supprimer 
    button.addEventListener("click", function(event){
      // on affiche les données dans la console
      console.log('suppimer ?')
      // on récupère l'élément parent de l'élément cliqué
      let deleteBtn = event.target
      let itemDiv = deleteBtn.closest('article')
      console.log(itemDiv)
      // on récupère l'id du produit
      let itemId = itemDiv.dataset.id
      console.log(itemId)
      // on récupère la couleur du produit
      let itemColor = itemDiv.dataset.color
      console.log(itemId+""+itemColor)
      // on appelle la fonction qui va supprimer l'item du localStorage
      deleteBasketItems(itemId,itemColor)
      // on appelle la fonction qui va recalculer le total
      renderTotal();
    })
  })
}
//création d'une fonction qui va supprimer l'item du localStorage
function deleteBasketItems(id, color) {
  // on récupère les items du localStorage
  for (let i=basketItems.length-1; i >= 0 ;i--){
  // on parcourt les items du localStorage pour trouver l'id et la couleur du produit à supprimer 
      if (basketItems[i].id == id && basketItems[i].color == color) {
        // on supprime l'item du localStorage  
      basketItems.splice(i,1)
      // on met à jour le localStorage avec les items restants 
      window.localStorage.setItem('Basketitems', JSON.stringify(basketItems))
      // on supprime l'item du panier 
      document.querySelector(`[data-id="${id}"][data-color="${color}"]`).remove()
      return
    }
  }
  initSupprimer()
}
////création d'une fonction qui va initialiser la quantité des produits
// en modifiant la quantité dès qu'il y a un changement
 
 function initQtyItems(){
  // on récupère les inputs de la classe itemQuantity  
 document.querySelectorAll('.itemQuantity').forEach ((modification)=>{
  // on ajoute un écouteur d'événement au changement de la quantité des produits 
  modification.addEventListener('change',function(event){
    //Modification des items suite changement attention variables locales
    let modifQtyItems= event.target;
    // on récupère l'élément parent de l'élément cliqué 
    let itemModifItems=modifQtyItems.closest("article");
    // on récupère l'id du produit 
    let itemIdModif = itemModifItems.dataset.id
    // on récupère la couleur du produit
    let itemColorModif = itemModifItems.dataset.color
    // on récupère la quantité du produit 
    let itemQtyModif = modifQtyItems.value
    // on affiche les données dans la console
      console.log (itemQtyModif)
      console.log (itemIdModif +""+itemColorModif)
      // on appelle la fonction qui va modifier la quantité de  l'item du localStorage
    deleteBasketQty(itemIdModif,itemColorModif,itemQtyModif)
    // on appelle la fonction qui va recalculer le total du panier
    renderTotal();
    } )
  })
}
//function qui met à jour la quantité d'un item dans le localStorage
function deleteBasketQty(id, color, quantity){
  // on récupère les items du localStorage 
  for (let i=0; i<basketItems.length; i++){
    // on parcourt les items du localStorage pour trouver l'id et la couleur du produit à modifier
    if ( basketItems[i].id== id && basketItems[i].color == color){
      // on modifie la quantité de l'item du localStorage 
      basketItems[i].quantity = quantity;
      // on met à jour le localStorage avec les items modifiés
      localStorage.setItem('Basketitems', JSON.stringify(basketItems));
      // on appelle la fonction qui va initialiser la quantité des produits 
      initQtyItems()
      // on appelle la fonction qui va supprimer l'item du panier si la quantité est égale à 0
      if (basketItems[i].quantity == 0){
        // on appelle la fonction qui va supprimer l'item du panier
        deleteBasketItems(id, color)
      }
    }
  }
}
//function price d'un item
// on récupère le prix d'un item du panier  en fonction de son id 
function getPrice(id) {
  // on parcourt le tableau products pour trouver le prix du produit en fonction de son id
  for (let i = 0 ; i < products.length ;i++){
    // on retourne le prix du produit en fonction de son id 
    if (products[i]._id == id) {
      console.log(parseFloat(products[i].price))
      // on retourne le prix du produit en fonction de son id 
      //la function parseFloat() permet de convertir une chaîne de caractères en nombre flottant
      return parseFloat(products[i].price)
    }
  }
  // on retourne 0 si l'id n'est pas trouvé
  return 0
}
// 
//function qui calcule le total du panier
function renderTotal() {
  // on initialise le total à 0
  let total = 0;
  // on initialise la quantité à 0
  let qty = 0
  // on parcourt le tableau basketItems pour calculer le total du panier
  for (let i=0; i < basketItems.length ;i++){   
    // la fonction parseInt() permet de convertir une chaîne de caractères en nombre    
    qty += parseInt(basketItems[i].quantity)
    // on calcule le total du panier  en multipliant la quantité par le prix
    total += parseInt(basketItems[i].quantity) * getPrice(basketItems[i].id)    
  }
  // on affiche le total dans la console
  console.log("total: " + total)
  // on affiche le prix total dans le panier
  document.getElementById('totalPrice').innerHTML = total
  // on affiche la quantité totale dans le panier
  document.getElementById('totalQuantity').innerHTML = qty
}

//function qui supprime l'item du panier
  console.log(deleteBasketItems)
  let elts = document.querySelectorAll('.cart__item').forEach(div => {
    if (div.dataset.id == id) {
      div.parentNode.removeChild(div)
      return
    }
  }) 
 //recalculer le total
renderTotal()

//FORMULAIRE
const order = document.getElementById('order');
// on ajoute un écouteur d'événement au click sur le bouton "commander"
order.addEventListener('click', async (event) =>{
  event.preventDefault();

  //assignation de l'iD à un element du HTML 
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');
  console.log("name: "+firstName.value)
  //création d'un tableau qui va contenir les id des produits du localStorage
  // et qui va être envoyé au serveur dans la fonction sendOrder
  let productsId = []
  //on parcourt le tableau basketItems pour récupérer les id des produits
    for (let i=0; i< basketItems.length; i++){
    //on ajoute les id des produits dans le tableau productsId
       productsId.push(basketItems[i].id)
      console.log("basketItems: "+basketItems[i].id)
    }
  //création d'un objet qui va contenir les données du client et les id des produits du panier 
  //pour envoi de cet objet au serveur
    const formData ={
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city : city.value,
      email: email.value,
      products : productsId,
  } 
    
    //reggex pour vérifier que firstName et lastName n'ont pas de chiffres
    const regexfirstName = /^[a-zA-Z]+$/;
    const regexlastName = /^[a-zA-Z]+$/;
   
  //si le nom ou le prénom ne respecte pas la reggex, on affiche un message d'erreur et on bloque l'envoi des données
   if (!regexfirstName.test(firstName.value) || !regexlastName.test(lastName.value)){
    alert("Veuillez entrer un nom et un prénom valide") 
    console.log("nom ou prénom non valide")
    return
  }
 
  //si le formulaire est vide,on affiche un message d'erreur et on bloque l'envoi des données
  
  if (firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" || email.value == ""){
    alert("Veuillez remplir le formulaire")
    console.log("formulaire vide")
    return
  }
  //sinon on envoie les données du client au serveur
   else {
    //transformation de l'objet en string
    const products =  basketItems.map((order)=>order.Id)
    console.log("products: "+products)
    let clientData = JSON.stringify(formData);
    console.log("clientData: "+clientData);
    try{ 
      const res = await fetch("http://localhost:3000/api/products/order", {
        //création d'une requête POST
        method: 'POST',
        //on précise que l'on envoie des données au format JSON
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: clientData, 
      });
      const confirm = await res.json();
      console.log("confirm: "+confirm);
      //on récupère l'id de la commande et on l'envoie à la page de confirmation
      window.location.href= " ./confirmation.html?orderId=" +confirm.orderId;      //on vide le localStorage
      localStorage.clear();
    }catch(error){
      console.log(error);
        }
    }
  });

 

  