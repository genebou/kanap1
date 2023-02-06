
var basketItems = window.localStorage.getItem('Basketitems');
if (basketItems === null){
    basketItems=[]
}
else{
    basketItems=JSON.parse(basketItems)
}
console.log(basketItems)
async function renderBasket(){
  for( let i = 0 ; i < basketItems.length; i++ ){
    let res  = await fetch('http://localhost:3000/api/products/'+ basketItems[i].id)
    let product = await res.json()
    console.log(product)
      let cartItem = document.createElement('article')
      cartItem.innerHTML= product.colors
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

      for (let i = 0; i< product.colors.length; i++ ){
    let productColor = document.createElement('p');
    cartItemContentDescription.appendChild(productColor);
    productColor.innerHTML = product.colors[i];
      }
      
        
         }  
    }

renderBasket()
console.log(renderBasket)
alert(3)


