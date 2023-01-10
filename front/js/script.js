fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => {
    console.log(data)
    for  (let i = 0 ; i < data.length; i++) {
        let a = document.createElement('a')
        a.href = 'product.html?id=' + data[i]._id
        let article = document.createElement('article')
        let h3 = document.createElement('h3')
        let img = document.createElement('img')
        let p = document.createElement('p')
        img.src = data[i].imageUrl
        article.appendChild(img)
        h3.innerHTML = data[i].name
        article.appendChild(h3)
        p.innerHTML = data[i].description
        article.appendChild(p)
        a.appendChild(article)
        document.getElementById('items').appendChild(a)
    }
    // addProducts(data) test
})