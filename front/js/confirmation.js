//récupération orderId dans l'url
let params= new URL(document.location).searchParams;
let orderIdUrl = params.get("orderId");
//affichage orderId dans la page confirmation
let orderId = document.getElementById('orderId');
let p = document.createElement('p');
p.innerHTML = orderIdUrl;
orderId.innerHTML = orderIdUrl;


/*function getParams(url = window.location) {
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
}*/








   
   


