


//Récupération des canapés eventuellement stockées dans le localStorage
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
 }
}
renderBasket()
  
       .then((data) => {
        console.log()
 /*<!--<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
*/
for (let i = 0; i< basketItems.lenght; i++){
    let items = basketItems[i];
    let data = renderBasket(items.id);

    document.getElementById('cart_items').innerHTML
    let cartItem = createElement('.cart_item')
    cart_items.appendChild(cartItem)
    cartItem.innerHTML +=  '"${items.id}" "${items.color}"'
    
    let cartItemImg = createElement(cart_item_img)
    cartItem.appenchild(cartItemImg)
    cartItemImg.innerHTML
    let img = document.createElement('img')
    cartItemImg.appendChild(img)
    img.src = data[i].imageUrl
    img.alt = data[i].altText
    let cartItemContent = createElement(cart_item_content)
    cartItem.appendChild(cartItemContent)
    cartItemContent.innerHTML
    let cartItemContentDescription = createElement(cart_item_content_description)
    cartItemContent.appendChild(cartItemContentDescription)
    cartItemContentDescription.innerHTML +="${items[i].name} {items[i].colors} {items[i].price}"

    let h2 = createElement(h2)
    cartItemContentDescription.appendChild(h2)
    h2.innerHTML=data[i].name

    let couleur =createElement(p)
    cartItemContentDescription.appendChild(couleur)
    couleur.innerHTML=items[i].colors

    let price = createElement(p)
    cartItemContentDescription(price)
    price.innerHTML=data.price
 let cartItemContentSettings = createElement(cart_item_content_settings)
 cartItemContent.appendChild(cartItemContentSettings)
 let quantity = createElement(p)
 cartItemContentSettings.appendChild(quantity)
 quantity.innerHTML="Quantité"
    for (i = 0; 1< i <100;i++) { 
        let itemQuantity = createElement(itemQuantity)
        cartItemContentSettings.appendChild(itemQuantity)
        itemQuantity.innerHTML =items[i].quantity
        
        
    console.log()
    }
    
        basketItems.push(Kanap);
}

TotalBasketPrice()

    
    
    function TotalBasketPrice() {
        var totalQuantity = 0
        var totalPrice = 0
        for (let i=0; i<basketItems; i++) {
            document.getElementById(totalQuantity) = basketItems[i].quantity;
            totalQuantity += parseInt(basketItems);

            document.gerElementById(totalPrice) = basketItems[i].price*basketItems[i].quantity;
            totalPrice += parseInt(totalPrice);
            console.log[i]        
              console.log[totalQuantity]
            console.log[totalPrice]
        }
    }
console.log()

/*article.appendChild(idCartItems)
/* <div class="cart__item__img">*/
/*let cartItemImg = document.createElement('cart_item_img')
cartItemImg.appendChild(article)
let img = document.createElement('img')
img.appendChild(cartItemImg)
img.src = data.imageUrl
/*img.alt = renderBasket.altTxt

let cartItemContent= document.createElement('cart_item_content')
cartItemContent.appendChild(article)
/*               
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->*/

//idCartItem.appenChild(article)
/*let cartItemImg = document.createElement('cart_item_img')
cartItem.appenChild(cartItemImg)
document.getElementsById('cart_items')
       */ })