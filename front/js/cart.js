fetch("http://localhost:3000/api/products")
function getParams (url = window.location) {
    // Create a params object
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
        params[key] = val;
    });
    return params;
}
let params = getParams()
console.log(params)
let productId = params['id']
console.log("Affichage du panier")
fetch("http://localhost:3000/api/products/")
.then((res) => res.json())
.then((data) => {

//création HTML
console.log(data)

let article = document.createElement('Article')
let cartItem= document.getElementsByClassName('cart_item').getElementsById('article')
let cartItemImg = document.createElement('cart_item_img')
document.getElementsByClassName('cart_item_img').appendChild(article)

}
)
