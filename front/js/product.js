function getParams(url = window.location) {
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
        params[key] = val;
    });
    return params;
}
// ajouter au panier
function onAddToBasket(event) {
    // ajouter la couleur
    // colors => fichier JSON
    //value => fichier product.html
    const selectedColor = colors.options[colors.selectedIndex].value
    let found = false
    for (let i = 0 ; i < basketItems.length; i++) {
        // si ce canapé a déjà été choisi 
        //et donc mis dans le panier avec la même couleur 
        //alors la qté = la nouvelle qté + celle qui était déjà dans le panier
        if (basketItems[i].id == productId && basketItems[i].color == selectedColor) {
            basketItems[i].quantity = parseInt (basketItems[i].quantity ) + parseInt ( quantity.value )
            found = true
            // sinon, on arrête la boucle
            break;
        }        
    }
    if (!found) { 
        // si le canapé dans ce coloris n'a pas déjà été mos dans le panier
        let Kanap =
        {
            id: productId,
            color: selectedColor,
            quantity: quantity.value,
        }
        basketItems.push(Kanap);
    }
    localStorage.setItem('Basketitems', JSON.stringify(basketItems))
}
var basketItems = JSON.parse(localStorage.getItem('Basketitems'));
// si rien n'est ajouté dans basketItems => on ne rajoute rien dans le localStorage
if (basketItems == null) {
    basketItems = []
}
// les produits sont ajoutés dans le localStorage
let params = getParams()
var productId = params['id']
// console.log("Affichage du produit : " + productId)
fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        document.title = data.name
        let img = document.createElement('img')
        img.src = data.imageUrl
        img.alt = data.altTxt
        document.getElementsByClassName('item__img')[0].appendChild(img)
        title.innerHTML = data.name
        price.innerHTML = data.price
        description.innerHTML = data.description
        for (let i = 0; i < data.colors.length; i++) {
            let option = document.createElement('option')
            option.value = data.colors[i]
            option.innerHTML = data.colors[i]
            document.getElementById('colors').appendChild(option)
        }
    }
)


document.getElementById('addToCart').addEventListener('click', onAddToBasket)