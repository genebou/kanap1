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
        cartItem.setAttribute("data-ID","product-ID")
        cartItem.setAttribute("data-color","product-color")
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


//création d'une fonction qui ve mettre à jour le basketItem 
//afin d'envoyer un panier actualisé dans la page confirmation
function deleteBasketItems(){
  //document.querySelectorAll('itemQuantity').innerHTML="";
   document.querySelectorAll('deleteItem').addEventListener('click', function(event) {
    let deleteBtn = event.target
    let itemDiv = deleteBtn.parentNode.parentNode.parentNode // pour remonter dans l'arborescence HTML du bouton vers la div
    let itemId = itemDiv.dataset.id 
  console.log(deleteBtn)
  let basketDelete =[]
  console.log(basketDelete)
  console.log(basketItems)
      for (let i=0; i< deleteBtn.length ;i++){
      deleteBtn[i].addEventlistener("click", function (){ 
        deleteBtn[i].style.display="none";
        basketDelete = basketItems;
      for (let i= basketDelete.length -1; i > 0; i--) {
        delete basketDelete[i].altTxt;
        delete basketDelete[i].imageUrl;
        delete basketDelete[i].name;
        delete basketDelete[i].price;

        basketDelete= basketItems.splice([i],1);
          console.log(basketDelete)
          alert(ok)
         }
        }
      )
      
    }
  })
}
deleteBasketItems()
}



renderBasket()



 
   /* //à chaque click, le basketDelete sera actualisé -basketItems actualisé)
    let deleteBtn = document.querySelectorAll('cart__item__content__setting__delete');
      for (let i=0; i<deleteBtn.length;i++){
      
        for(i=0; i<deleteBtn.length; i++){
           deleleBtn.addEventlistener("click", function (){       
       for (i=0; i<deleteBtn.length; i++){
       if( 
          deleteBtn[i].style.display = "none"
           )
        {basketDelete = basketItems [i]
          alert(1)
        }
        else(
           basketDelete.splice([i,1])
        )
        } 
        console.log(basketDelete)
       }
       )
       
      }
      
    }
    
  } 
    
 

deleteBasketItems()
       
               
       
     */