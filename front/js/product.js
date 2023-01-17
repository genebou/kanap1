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
    const article = pieces[0];

         let img = document.createElement('img')
        img.src = data.imageUrl
        img.alt = data.altTxt
        document.getElementsByClassName('item__img')[0].appendChild(img)
        item_img.innerText = data.item_img
        document.getElementById('price').innerHTML = data.price
        price.innerText = 'Prix :${data.price} €';

    }
)
function products (name,price,description,altTxt,colors){
    this.name = name;
    this.price = price;
    this.description = description;
    this.altTxt = altTxt;
    this.colors = colors;
    }
    let products =[];
document.createElement('option')
option.value = "sdds"
option.innerHTML = "sadsasad"
document.getElementById('leselect').appendChild(option)

<select>
<option value="blue">Canape Bleu tres joli</option>
<option value="pink">Canape Rose</option>
</select>
//travail du 17/01



//
//GamepadButton.addEventListener("click",function(){
    //let color = colorInput.value;
    //let quantityValue = parseInt(quantity.value);
    //if (color === "" && quantityValue === 0){
        //console.log(colorInput.value);
        //alert("Vous devez sélectionner une couleur et une quantité")
   // }
    //stockage de l'id, qté,img et color dans le localStorage
    //let productOrder ={
     //   id: id,
      //  quantity: quantityValue,
      //  image: document.getElementById("productImage").src,
      //  title: title.innerText,
       / color: color,
  //  };
  //  let cart = localStorage.getItem("products");
  //  if (cart == null) {
        cart = [];
  //  }else {
   //     cart =JSON.parse(cart);
  //  }
 // let newITem = true;
    // if(....)si le produit existe déjà avec la même color il faut incrémenter la valeur
    //produit.quantity += productOrder.quantity
 //   for (let produit of cart){
     //   if {
      //      productOrder.id === produit.id &&;
      //      productOrder.color === produit.color;
      //  }else {produit.quantity += productOrder.quantity;
     //   newItem=false;}
    //}
   //if (newItem === true){
  //  cart.push(productOrder);
 //  }     
 //  localStorage.setItem("products,JSON.stringify(cart))");
 //  alert("Le produit a été ajouté au panier");
 //   }
//)








