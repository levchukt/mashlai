//Взаємодія з json файлом

async function getProducts() {
    var response = await fetch("item.json")
    var products = await response.json()
    return products
}

function getCardHTML(product){
    var productData = JSON.stringify(product)
    return `
    <div class="item">
          <p class="text-item-catalog-main">${product.title}</p>
          <img src="img/${product.image}" alt="Хустина УПС" class="img-item-catalog-main">
          <div class="price_cnt-main">
            <p class="wrong_price-item-catalog-main">${product.oldPrice}</p>
            <p class="true_price-item-catalog-main">${product.newPrice}</p>
          </div>
          <button class="btn-item-catalog-main">Купити</button>
        </div>
    `
}

getProducts().then(function(products){
    var productsList = document.querySelector('.catalog_cnt')
    if (productsList){
        products.forEach(product => {
            productsList.innerHTML += getCardHTML(product)
        });
    }
    var buyButtons = document.querySelectorAll('.btn-item-catalog-main')
    if (buyButtons){
        buyButtons.forEach(button =>{
            button.addEventListener('.click', buItem)
        })
    }
})

function buItem() {
    console.log("Купив")
}

//Пошук

function searchProducts(event) {
    event.preventDefault()

    var field = document.querySelector('.search_field')
    var query = field.value.toLowerCase()
    var productsList = document.querySelector('.catalog_cnt')
    productsList.innerHTML = ''

    getProducts().then(function(products){
        let productsList = document.querySelector('.catalog_cnt')
        products.forEach(product =>{
            if (product.title.toLowerCase().includes(query)){
                productsList.innerHTML += getCardHTML(product)
            }
        })
        let buyButtons = document.querySelectorAll('.buy')
        if ( buyButtons){
            buyButtons.forEach(button =>{
                button.addEventListener('click', buyItem)
            })
        }
    })
}

var searchForm = document.querySelector('.search')
searchForm.addEventListener('submit', searchProducts)
var searchForm = document.querySelector('.search_btn')
searchForm.addEventListener('click', searchProducts)