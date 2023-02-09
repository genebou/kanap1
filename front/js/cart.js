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
  // création des Eléments HTML et CSS => il faut faire une fonction mais comment ?
   
      let cartItem = document.createElement('article')
        cartItem.innerHTML= product.colors[i]
        document.getElementById('cart__items').appendChild(cartItem)
        cartItem.classList.add('cart__item')
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
        deleteProduct.innerText="Supprimer"
}
}
renderBasket()

function deleteBasketItems(){
    basketDelete =[]
    let deleteBtn = document.querySelectorAll("deleteItem");
    
    for (let i=deleteBtn.length -1; i>=0;i--){
      deleteBtn.addEventlistener("click", ()=>{
        if (deleteBtn[i].style.display = "none"){
          basketDelete = basketItems;
       } else{
        for (let i=0; i<basketDelete.length; i++) {
         // delete basketDelete[i].altTxt;
          //delete basketDelete [i].imageUrl;
         // delete basketDelete[i].name;
         // delete basketDelete[i].price;
          basketDelete.splice([i]);
         }
       }
       console.log(basketDelete)
     }
    )
  }
}
deleteBasketItems()
console.log(deleteBasketItems)




  
    

       
               
       
      
