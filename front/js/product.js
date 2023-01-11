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
    }
)
document.createElement('option')
option.vaue = "sdds"
option.innerHTML = "sadsasad"
document.getElementById('leselect').appendChild(option)

<select>
<option value="blue">Canape Bleu tres joli</option>
<option value="pink">Canape Rose</option>
</select>









