//récupération des canapés du localStorage
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
    console.log(product)
  // création des Eléments HTML et CSS 
   
    let cartItem = document.createElement('article')
      cartItem.innerHTML= product.colors[i]
      document.getElementById('cart__items').appendChild(cartItem)
      cartItem.classList.add('cart__item')
      cartItem.setAttribute("data-ID",product._id)
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
    let h2 = document.createElement('h2')
      cartItemContentDescription.appendChild(h2)
      h2.innerHTML=product.name
    let productColor = document.createElement('p')
      cartItemContentDescription.appendChild(productColor)
      productColor.innerHTML = product.colors[i]        
    const productPrice = document.createElement("p");
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

clickSupprimerItems()
}
renderBasket()

//Sélection de la quantité et de la couleur
// lorsque l'utilisateur va "cliquer" sur le bouton "supprimer"
function clickSupprimerItems(){
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
  //modification de la quantité lorsque l'utilsateur va modifier dans la class .itemQuantity
function modifQtyItems (){
  document.querySelectorAll('.itemQuantity').forEach(function(input){
    input.addEventListener('change',function(event){
      let modifQty = event.target
      let itemModifDiv = modifQty.inputProductQuantity.value
      let itemQtyModif = itemModifDiv.dataset.quantity
      //let itemIdModif = modifQty.dataset.id
     // let itemColorModif = modifQty.dataset.color
      console.log (itemQtyModif)
     // console.log (itemIdModif +""+ itemQtyModif)
      deleteBasketQty(itemQtyModif)
    }
    )
  }
  )
}

   //modification du basketItems dans le localStorage suite clic sur Btn" supprimer"
  function deleteBasketItems(id,color){
      for (let i=0; i< basketItems.length ;i++){
        if (basketItems[i].id == id && basketItems[i].color == color){
          // si l'utilateur clique sur l'id du Kanapé et la couleur =>  supprimé
          let deleteBasketItems=[]
          deleteBasketItems= basketItems.splice(i,1)
          localStorage.setItem('Basketitems', JSON.stringify(basketItems))
          break;
        }
      }
  }
      
 //modification du basketItems dans le localStorage suite modification qté
 function deleteBasketQty(id, color, quantity){
  for (let i=0; i<basketItems.length; i++){
      if ( basketItems[i].quantity == null){
          deleteBasketItems(id,color);
        }else {
          localStorage.setItem('Basketitems', JSON.stringify(basketItems))
          break;
        }
      
  }
 }

       
               
       
    