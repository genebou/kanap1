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
console.log("Affichage du produit : " + productId)
fetch("http://localhost:3000/api/products/" + productId)
.then((res) => res.json())
.then((data) => {
    console.log(data)

   let img = document.createElement('img')
    img.src = data.imageUrl
    img.alt = data.altTxt
    document.getElementsByClassName('item__img')[0].appendChild(img)    
    document.getElementById('price').innerHTML = data.price
    document.getElementById('description').innerHTML = data.description
    for  (let i = 0 ; i < data.colors.length; i++) {
        let option = document.createElement('option')
        option.value = data.colors [i]
        option.innerHTML = data.colors [i]
        document.getElementById('colors').appendChild(option)
        } 
}
)
//ajouter au panier
document.getElementById('addToCart').addEventListener('click',onAddToBasket)
        function onAddToBasket(event) {
                let item =
                {
                    id: '_id',
                    color:'vert',
                    quantity:1,
                }
            localStorage.setItem('Basketitems', JSON.stringify(item))
        }

        





