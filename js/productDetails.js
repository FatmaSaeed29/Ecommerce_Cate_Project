
document.addEventListener("DOMContentLoaded", function () {
    const productDetailsContainer = document.getElementById("productDetailsContainer");
    let product;
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Assuming your fake API endpoint is http://localhost:3000/fakeProducts
    fetch(`https://products-lac-ten.vercel.app/products?id=${productId}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }
            return res.json();
        })
        .then((productDetails) => {
            console.log(productDetails); // Log the response
            product = productDetails[0];
            console.log(product.item)
            updateProductDetails(product);
        })
        .catch((error) => {
            console.error('Error fetching product details:', error);
        });
});



function updateProductDetails(product) {
    // Update the HTML content with the product details
    // const product = productDetails[0];
    // console.log(product)
    productDetailsContainer.innerHTML = `
    <div class="card">
    <nav>
    <a href="../shop.html" class="product-details-back">
        <svg class="arrow" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " stroke="#727272"/></svg>
        Back to all Products
    </a>
        <svg class="heart" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" stroke="#727272" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" stroke="#727272"/>
        </svg>
        
    </nav>
    <div class="photo">
        <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="description">
        <h2class="productDetails-name">${product.name}</h2class=>
        <h1>$${product.price}</h1>
        <p>${product.description}</p>
        <button>Add to Cart</button>
        <button>Wishlist</button>
        <div class="productDetails-icons">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-square-instagram"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-twitter"></i>
        </div>
    </div>
    </div>`;
}


var calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

var increment = (id, price, image , name) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) {
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


    // console.log(basket);
    localStorage.setItem("products", JSON.stringify(basket));
    // update(selectedItem); // Commented out this line
    generateCartItems(); // Moved this line here
    calculation();
    TotalAmount();
}

var decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) return;
    else if (search.item === 1) {
        // Remove the entire <tr> element when quantity reaches zero
        basket = basket.filter((x) => x.id !== selectedItem);
        document.getElementById(selectedItem).parentNode.parentNode.parentNode.remove();
    } else {
        search.item -= 1;
        update(selectedItem);
    }

    localStorage.setItem("products", JSON.stringify(basket));
    generateCartItems(); 
    TotalAmount();
    calculation(); 
}


var update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
    // removeItem();
}


















