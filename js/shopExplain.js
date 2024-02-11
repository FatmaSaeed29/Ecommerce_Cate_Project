let shop = document.getElementById("shop");
let shopItemData;

// Array to store the selected products
let basket = JSON.parse(localStorage.getItem("products")) || []; 

// Functions to increase or decrement the quantity number in the product cart

let increment = (id) => {
    let selectedItem = id;
    // i will make a variable that check if item already exist in basket -> just increment the item. if not -> add new object
    let search = basket.find((x) => x.id === selectedItem);

    // if item not exist --> add new one 
    if(search === undefined){
        basket.push({
            id: selectedItem,
            item: 1
        })
    }
    else{
        search.item += 1; 
    }

    // console.log(basket);
    localStorage.setItem("products", JSON.stringify(basket))
    update(selectedItem);
}

let decrement = (id) => {
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
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation()
}

//make a function that update the number of the cart (add all numbers)
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    // cartIcon.innerHTML = 100;
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y ,0)
    // console.log()
}
// i call calculation so every time the app load this will run so no.products on cart will not disappear
calculation();
fetch("http://localhost:3000/products")
    .then((res) => {
        if (!res.ok) {
            console.log(`There's an error while fetching the products. Status is: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        let generateShop = () => {
            return (shop.innerHTML = data.map((item, index) => {
                const modalId = `modal-${index}`;
                // search for the id in the local storage to check uf product exist or not if not return empty array
                let search = basket.find((x) => x.id === item.id) || []
                return `
                <div id=product-id-${item.id} class="item">
                    <img src="${item.image}" width="245" height="255" alt="" class="text-center m-auto original-img " data-bs-toggle="modal" data-bs-target="#${modalId}">

                    <div class="modal fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="${modalId}Label">${item.name}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <img src="${item.image}" alt="" class="text-center m-auto modal-img">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Show Details</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="details">
                        <h3>${item.name}</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, excepturi!</p>
                        <div class="price-quantity">
                            <h2>${item.price} $</h2>
                            <div class="buttons">
                                <i  onclick="decrement(${item.id})" class="fa-regular fa-minus"></i>
                                <div id=${item.id} class="quantity fs-4">
                                ${search.item === undefined ? 0 : search.item}
                                </div>
                                <i onclick="increment(${item.id})" class="fa-solid fa-plus-large"></i>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join(""));
        }
        
        generateShop();

    });
