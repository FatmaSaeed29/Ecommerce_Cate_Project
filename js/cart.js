let label = document.getElementById("label");
let shopping_cart = document.getElementById("shopping-cart");
let cart_title = document.getElementById("cart-title");
let cart_table = document.getElementById("cart-table");
let cart_thead = document.getElementById("cart-thead");
let cart_buttons = document.getElementById("cart-buttons")

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
        // console.log("selected items are :" , data);
        generateCartItems();
        TotalAmount();
        // console.log(totalAmountValue);
    });


function generateCartItems(){
    if (basket.length !== 0) {
        cart_title.innerHTML = `
        <h4 class=" shopping-cart-header fs-2"> Shopping Cart </h4>

        `;

        cart_thead.innerHTML = `
            <tr class="cart-item-header text-center">
            <th>Description</th>
            <th class="text-start">Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th></th>
            </tr>
        `;

        cart_table.innerHTML = basket.map((x) => {
            let { id, item ,price , name , image} = x;
            console.log(id)
            console.log(item)
            let search = data.find((y) => y.id === id) || [];
            console.log(image)
          return `
                <tr>
                  <td class="cart-item">
                    <div class="cart-item-image text-center">
                      <img src="${image}" alt="">
                      <h3>${name}</h3>
                    </div>
                  </td>
                  <td class="cart-item-price">${price} $</td>
                  <td>
                    <div class="buttons cart-item-quantity d-flex">
                      <i onclick="decrement(${id})" class="fa-regular fa-minus"></i>
                      <div id="${id}" class="quantity fs-4">${item}</div>
                      <i onclick="increment(${id} , ${price})" class="fa-solid fa-plus-large"></i>
                    </div>
                  </td>
                  <td>
                  
                    <span class="cart-item--total-price">${(item * price )} $</span>
          
                  </td>
                  <td>
                    <i onclick="removeItem(${id})" class="fa-light fa-circle-xmark" ></i>
                  </td>
                </tr>
            `;
        }).join("");
    } else {
        shopping_cart.innerHTML = ``;
        cart_title.innerHTML = ``;
        cart_buttons.innerHTML=``;
        label.innerHTML = `
            <h2> Cart is Empty 🙁 ! </h2>
            <a href="../shop.html" >
                <button class="HomeBtn"> Back To Shop </button>
            </a>
        `;
    }
}
var calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

var calculationPrice = () => {
    let total_price_update = document.getElementById("total_price_update");
    let totalPrice = basket.reduce((total, item) => {
        // Assuming each item has a valid 'price' property
        return total + (item.price * item.item);
    }, 0);

    total_price_update.innerHTML = totalPrice.toFixed(2) + " $";
}


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

var removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem)
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems()
    TotalAmount();
    calculation()
    localStorage.setItem("products", JSON.stringify(basket));

}

// fn for clear all cart
var clearCart = () =>{
    basket = [];
    generateCartItems();
    localStorage.setItem("products", JSON.stringify(basket));
    calculation()
}


// to show the total price in the top in case there are products in the cart
var TotalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {item , price} =x;
            // let search = data.find((y) => y.id === id) || [];
            return item * price
        }).reduce((x,y) => x+y , 0)
        // console.log(amount)
        cart_title.innerHTML = `
        <h4 class=" shopping-cart-header fs-2 text-start"> Shopping Cart </h4>
        
        `;
        cart_buttons.innerHTML = `
        <div class="cart-btns">
            <a  class="btn btn-outline-success me-5" href="#" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Checkout</a>
            <button onclick="clearCart()"  type="button" class="btn btn-outline-danger">Clear Car</button>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title me-2" id="exampleModalLabel">Total Price <i class="fa-light fa-money-bill-wheat"></i></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <h4 class="  cart-subtotal-price fs-2"> Subtotal Price: ${amount} $ </h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Buy Now</button>
            </div>
            </div>
        </div>
        </div>
        `
    }
    else{
        return;
    }
}
