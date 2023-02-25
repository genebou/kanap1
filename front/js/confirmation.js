//récupération des données du client du serveur et affichage de l'orderId dans le HTML 

const reponse =await fetch ('http://localhost:3000/api/products/_id', {
    method: "get",
    headers: {
        "content-Type": "application/json",
        "Accept":"application/json"
    },
    // définir le body de la requête
    // définir clientData comme étant un objet JSON
    
     body: JSON.stringify()
    
    
})
    
.then((res) => res.json())
.then((data) => {
    let orderId = document.getElementById('orderId');
let orderIdValue = window.location.search.split("?orderId=").join("");
console.log(orderIdValue);
console.log(orderId);
orderId.innerHTML = data.orderId;


console.log(orderId);
})

        /*let orderId= document.getElementById("orderId");
        orderId.innerHTML = data.orderId;
        console.log(hello)
        console.log(data)
    })
    .catch((err)=>{
        alert("commande non valide");
    })
    

/*fetch ('http://localhost:3000/api/products/order',{
    method : "post",
    headers: {
        "content-Type": "application/json",
        "Accept":"application/json"
    },
    body: JSON.stringify(clientData)
})
.then((res) => res.json())
.then((data) => {
        let orderId= document.getElementById("orderId");
        orderId.innerHTML = data.orderId;
        console.log(orderId)
        console.log(data)
    })
    .catch((err)=>{
        alert("commande non valide");
    })
    
    
*/