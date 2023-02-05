


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
 
let article = document.createElement('Article')
let idCartItem= document.getElementsByClassName('.cart_items')
idCartItem.appenChild(article)
let cartItemImg = document.createElement('cart_item_img')
cartItem.appenChild(cartItemImg)
document.getElementsById('cart_items')
       })