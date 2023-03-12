//création de la fonction getParams pour récupérer l'id du produit dans l'url   
function getParams(url = window.location) {
    // Création d'un objet vide
    let params = {};
    // Création d'un objet URL à partir de l'url de la page 
    // (window.location est l'url de la page courante)
    // (new URL(url) est un objet qui permet de manipuler l'url)
    // (new URL(url).searchParams.forEach est une méthode qui permet de parcourir les paramètres de l'url)
        new URL(url).searchParams.forEach(function (val, key) {
            // Ajout des paramètres de l'URL dans l'objet params
        params[key] = val;
    });
    // Retour de l'objet params
    return params;
}
// Récupération des données de l'API 
let title = document.getElementById('title')
// création de la function onADdToBasket pour ajouter un produit au panier lors du clic sur le bouton "ajouter au panier"
function onAddToBasket(event) {
    let colorSelect = document.getElementById('colors')
    // création de la variable selectedColor pour récupérer la couleur sélectionnée 
    //dans le menu déroulant
    const selectedColor = colorSelect.options[colorSelect.selectedIndex].value
    let quantity = document.getElementById('quantity')
    // création de la variable selectedQuantity pour récupérer la quantité sélectionnée
    let selectedQuantity = quantity.value
    // création de la variable found pour vérifier si le produit est déjà dans le panier
    let found = false
    // boucle pour vérifier si le produit est déjà dans le panier   
    for (let i = 0 ; i < basketItems.length; i++) {
         // si le produit est déjà dans le panier, on ajoute la quantité sélectionnée 
        //à la quantité déjà présente dans le panier
        if (basketItems[i].id == productId && basketItems[i].color == selectedColor) {
                // parseInt permet de convertir une chaîne de caractères en nombre
            basketItems[i].quantity = parseInt (basketItems[i].quantity ) + parseInt ( selectedQuantity )
                // si le produit n'est pas déjà dans le panier, on l'ajoute au panier
            found = true
                // on sort de la boucle
            break;
        }
    }// si le produit n'est pas déjà dans le panier, on l'ajoute au panier
    if (!found) {
        let Kanap =
            {
            id: productId,
            color: selectedColor,
            quantity: selectedQuantity,
            }
            // on ajoute le produit au panier avec la méthode push
        basketItems.push(Kanap);
    }
    // si la quantité sélectionnée est égale à 0 ou supérieur à 100
    if (selectedQuantity == 0 || selectedQuantity > 100 ) {
        alert("Veuillez sélectionner une quantité entre 1 et 100")
        //on n'ajoute pas le produit dans le basketItems
        basketItems.pop()
            } 
    
   // si selectedColor n'a aucun élément sélectionné
    if (selectedColor == "") {
        alert("Veuillez sélectionner une couleur")
        //on n'ajoute pas le produit dans le basketItems
        basketItems.pop()
        }   
        // on enregistre le panier dans le localStorage
    localStorage.setItem('Basketitems', JSON.stringify(basketItems))
        //on alerte l'utilisateur que le produit a bien été ajouté au panier si le produit n'est pas déjà dans le panier
    //et si la quantité est entre 1 et 100 et si selectColor n'est pas = à ""
    if (!found && selectedQuantity > 0 && selectedQuantity <= 100 && selectedColor != "") {
        alert("Le produit a bien été ajouté au panier")
    }
}
        // on récupère les données du panier dans le localStorage
    var basketItems = JSON.parse(localStorage.getItem('Basketitems'));
    // si le panier est vide, on crée un tableau vide
    if (basketItems == null) {
        // création d'un tableau vide
        basketItems = []
    }
    // on récupère l'id du produit dans l'url 
    let params = getParams()
    // on récupère l'id du produit dans l'url
    var productId = params['id']
    // si l'id du produit n'est pas défini ou égal à 0, on affiche la page 404
    if (typeof productId == "undefined" || productId == 0) {
        window.location.href = "/404.html";
    }
    // on affiche les données du produit dans la console
    // console.log("Affichage du produit : " + productId)
    // création de la fonction getProduct pour récupérer les données du produit
    fetch("http://localhost:3000/api/products/" + productId)
        // on récupère les données au format json
        .then((res) => res.json())
        // on récupère les données dans la variable data
        .then((data) => {
            // on affiche les données dans la console
            console.log(data);
            // on affiche les données dans la page html
            document.title = data.name
            // on crée un élément img
            let img = document.createElement('img')
            // on ajoute les attributs src et alt à l'élément img
            img.src = data.imageUrl
            img.alt = data.altTxt
            // on ajoute l'élément img à la classe item__img
            document.getElementsByClassName('item__img')[0].appendChild(img)
            // on affiche le nom du produit dans la page html
            title.innerHTML = data.name
            // on affiche le prix du produit dans la page html
            price.innerHTML = data.price
            // on affiche la description du produit dans la page html
            description.innerHTML = data.description
            // on crée un élément option pour chaque couleur du produit dans le menu déroulant 
            // et on affiche les couleurs dans le menu déroulant
            for (let i = 0; i < data.colors.length; i++) {
                let option = document.createElement('option')
                option.value = data.colors[i]
                option.innerHTML = data.colors[i]
                document.getElementById('colors').appendChild(option)
            }
        }
    )
        // au clic sur le bouton "ajouter au panier", on appelle la fonction onAddToBasket
    document.getElementById('addToCart').addEventListener('click', onAddToBasket)
        