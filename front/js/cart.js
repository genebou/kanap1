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
    //  création des Eléments HTML et CSS => il faut faire une fonction mais comment ?
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
  clickSupprimer()
  deleteBasketItems()
  deleteBasketQty()
  modifQtyItems()
  

}
renderBasket()

//création d'une fonction qui ve mettre à jour le basketItem 
//afin d'envoyer un panier actualisé dans la page confirmation


function clickSupprimer(){
  document.querySelectorAll('.deleteItem').forEach( function(button){
    button.addEventListener("click", function(event){
     let deleteBtn = event.target
     let itemDiv = deleteBtn.parentNode.parentNode.parentNode.parentNode
     let itemId = itemDiv.dataset.id
     let itemColor = itemDiv.dataset.color
     console.log(itemId+""+itemColor)
     deleteBasketItems(itemId,itemColor)
     
   })
   }
 )}
 //pour chaque changement sur la class .itemQuantity
 function modifQtyItems(){
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
    deleteBasketItems(itemIdModif,itemColorModif)
    renderTotal();
  }
  )
}
)
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

function deleteBasketItems(id, color) {
  for (let i=0; i < basketItems.length ;i++){
    if (basketItems[i].id == id && basketItems[i].color== color) {
      // on est sur le bon, on le vire
      basketItems = basketItems.splice(i, 1)
      localStorage.setItem('Basketitems', JSON.stringify(basketItems))
      break;
     }
  }
}


/*const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}
console.log(noms)
*/


  function deleteBasketQty(id, color, quantity){
    for (let i=0; i<basketItems.length; i++){
      if ( basketItems[i].id== id && basketItems[i].color == color){
        basketItems[i].quantity = quantity;
        localStorage.setItem('Basketitems', JSON.stringify(basketItems));
        deleteBasketItems(id,color)
       }
      }
    }
    
    
        
  
 
   console.log(deleteBasketQty)
  
 
  let elts = document.querySelectorAll('.cart__item').forEach(div => {
    if (div.dataset.id == id) {
      div.parentNode.removeChild(div)
      return
    }
  })
  
  // recalculer le total
  renderTotal()
