
var basketItems = window.localStorage.getItem('Basketitems');
if (basketItems === null){
    basketItems=[]
}
else{
    basketItems=JSON.parse(basketItems)
}

async function renderBasket(){
  for( let i = 0 ; i < basketItems.length; i++ ){
    let res  = await fetch('http://localhost:3000/api/products/'+ basketItems[i].id)
    let product = await res.json()
    console.log(product)
    
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

      let quantityProduct = document.createElement('p')
      cartItemContentSettingsQuantity.appendChild(quantityProduct)
      quantityProduct.innerHTML="Qté :"

      let inputProduct = document.createElement('p')
      cartItemContentSettingsQuantity.appendChild(inputProduct)
      inputProduct.classList.add('itemQuantity')
      inputProduct.innerHTML= `${basketItems[i].quantity}`
      


    }
  }

  
    renderBasket()
    console.log(renderBasket)

alert(3)
  


