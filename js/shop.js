let shop        = document.getElementById("shop");
let all         = document.getElementById("all");
let drinks      = document.getElementById("drinks");
let breakfast   = document.getElementById("breakfast");
let bread       = document.getElementById("bread");
let mug         = document.getElementById("mug");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
let shopItemData;

// Array to store the selected products
let basket = JSON.parse(localStorage.getItem("products")) || [];
let data;



fetch("https://products-lac-ten.vercel.app/products")
    .then((res) => {
        if (!res.ok) {
            console.log(`There's an error while fetching the products. Status is: ${res.status}`);
        }
        return res.json();
    })
    .then((fetchedData) => {
        data = fetchedData;
        generateCartItems(data);
        // Find the product with the specified ID from the URL
        const selectedProduct = data.find((product) => product.id === parseInt(productId));
        
        // Call updateProductDetails with the selected product data
        if (selectedProduct) {
            updateProductDetails(selectedProduct);
        } else {
            console.error('Product not found.');
        }
    });



all.addEventListener("click" , ()=> {
    generateCartItems(data);
})

drinks.addEventListener("click" , ()=> {
    let filteredProducts = data.filter((x) => x.category === "drinks");
    generateCartItems(filteredProducts);
})

breakfast.addEventListener("click" , () => {
    let filteredProducts = data.filter ((x) => x.category === "breakfast");
    generateCartItems(filteredProducts)
})

bread.addEventListener("click" , () => {
    let filteredProducts = data.filter ((x) => x.category === "bread");
    generateCartItems(filteredProducts)
})

mug.addEventListener("click" , () => {
    let filteredProducts = data.filter ((x) => x.category === "mug");
    generateCartItems(filteredProducts)
})

function generateCartItems(data){
    return (shop.innerHTML = data.map((item, index) => {
        const modalId = `modal-${index}`;
        // console.log(item.image)
        // search for the id in the local storage to check uf product exist or not if not return empty array
        let search = basket.find((x) => x.id === item.id) || []
        return `
        <div id="product-id-${item.id}" class="card product-card" style="width: 14rem;" >
        
            <img src="${item.image}" width="245" height="210" alt="" class="card-img-top text-center m-auto original-img" data-bs-toggle="modal" data-bs-target="#${modalId}" >
    
    
            <div class="details">
            <div class="icons">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            </div>
                <h6 class="text-center">${item.name}</h6>
                <div class="price-quantity">
                    <h5>${item.price} $</h5>
                    <div class="buttons">
                        <i onclick="decrement(${item.id})" class="fa-solid fa-cart-minus"></i>
                        <p id="${item.id}" class="quantity  mt-3">${search.item === undefined ? 0 : search.item}</p>
                        <i  onclick="increment(${item.id}, ${item.price}, '${item.image}', '${item.name}')"  class="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}Label">${item.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${item.image}" alt="" class="text-center m-auto modal-img img-fluid">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a class="btn btn-primary" onclick="showProductDetails(${item.id})" href="#" role="button">Show Details</a>
                    </div>
                </div>
            </div>
        </div>`;
    
    }).join(""));
}

var increment = (id, price, image , name) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    // if item not exist --> add new one 
    if(search === undefined){
        basket.push({
            id: selectedItem,
            item: 1,
            price: price,
            name: name,
            image: image
        });
    } else {
        search.item += 1; 
    }

    localStorage.setItem("products", JSON.stringify(basket));
    update(selectedItem);
}


var decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if(search === undefined) return;
    else if(search.item === 0 ){
        return; // if there is item quantity reaches 0 --> it will not make any sense to make the quantity negative -> so i will end the process of decrease in that condition
    }
    else{
        search.item -= 1;  // if the item exist and doesn't reach zero yet --> just decrease the quantity
    }

    // console.log(basket);
    //when quantity reaches zero --> deletes from basket
    update(selectedItem);

    // there is no need to store any product with quantity 0 !!
    basket = basket.filter((x) => x.item !== 0)
    
    localStorage.setItem("products" , JSON.stringify(basket))
}

// update the quantity number based on plus/minus
var update = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation()
}

//make a function that update the number of the cart (add all numbers)
var calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    // cartIcon.innerHTML = 100;
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y ,0)
    // console.log()
}
// i call calculation so every time the app load this will run so no.products on cart will not disappear
calculation();


function updateProductDetails(productDetails) {
    // Update the product image, name, price, description, etc.
    document.querySelector('.productDetails-image img').src = productDetails.image;
    document.querySelector('.productDetails-name').innerHTML = productDetails.name;
    document.querySelector('.productDetails-price').innerHTML = `${productDetails.price} $`;
    document.querySelector('.productDetails-desc').innerHTML = productDetails.description;
    console.log(productDetails)

    // Add event listeners for quantity buttons (you can customize this based on your requirements)
    const quantityElement = document.querySelector('.productDetails-quantity .quantity');
    document.querySelector('.fa-regular.fa-minus').addEventListener('click', () => decrementQuantity(quantityElement));
    document.querySelector('.fa-solid.fa-plus-large').addEventListener('click', () => incrementQuantity(quantityElement));
}

// In your showProductDetails function in shop.js
function showProductDetails(productId) {
    window.location.href = `../product-details.html?id=${productId}`;
    
}
