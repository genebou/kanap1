fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => {
    console.log(data)
    for  (let i = 0 ; i < data.length; i++) {
        // mise en place html <a>
        let a = document.createElement('a')
        a.href = 'product.html?id=' + data[i]._id
        // mise en place HTML <article>
        let article = document.createElement('article')
        a.appendChild(article)
        //mise en place HTML <img>
        let img = document.createElement('img')
        img.src = data[i].imageUrl
        article.appendChild(img)
        //mise en place HTML <H3>
        let h3 = document.createElement('h3')
        h3.innerHTML = data[i].name
        article.appendChild(h3)
        //mise en place HTML <p>
        let p = document.createElement('p')
        p.innerHTML = data[i].description
        article.appendChild(p)
        
        document.getElementById('items').appendChild(a)
    }
   
})