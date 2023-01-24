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
                    id: productId,
                    color : "je ne sais pas comment faire",
                    quantité: 8,
                }
            window.localStorage.setItem('Basketitems', JSON.stringify(item))
        }
        //stockage de l'ID, quantité, image et couleur dans le localstorage
        localStorage.getItem('Basketitems')
                     
           // let quantityValue = parseInt(quantity.value);
           // if (color === "" && quantityValue === 0){
             //   console.log(colorInput.value);
            //    alert("Vous devez sélectionner une couleur et une quantité")
          //  }
           
        
     //   let productOrder ={
    //  id: '_id',

     //        };
            
        
