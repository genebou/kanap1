fetch ('http://localhost:3000/api/products/order',{
    method : "post",
    headers: {
        "content-Type": "application/json",
        "Accept":"application/json"
    },
    body: JSON.stringify(clientData)
})
    .then((response)=>
    .then((data)=>{
        let orderId= dataOrderId

        console.log(orderId)
        console.log(data)
    })
    .catch((err)=>{
        alert("commande non valide");
    })
    )
    
