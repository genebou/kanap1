//récupération orderId dans l'url
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


let p = document.createElement('p');
p.setAttribute('orderId', getParams().orderId);
orderId.innerHTML = getParams().orderId;
let confirmation= document.getElementByClassName('confirmation').appenchild(p);


//affichage de l'orderId dans la page confirmation  
orderId.innerHTML = getParams().orderId;




   
   


