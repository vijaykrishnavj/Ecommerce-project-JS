// let api = fetch("test.json")
// api.then((response)=>{
//     let result = response.json()
//     result.then((A)=>{
//         console.log(A)

//     })
//     // console.log(response)
// }
// )



// sign in
function handleAccount(select) {
  const selectedValue = select.value;
  if (selectedValue === "signpage.html") {
      window.location.href = selectedValue;
  }
  else if (selectedValue === "signuppage.html") {
    window.location.href = selectedValue;
}
}



// // Pagination

function showData(start, end, button) {
  const allButtons = document.querySelectorAll('.btn2');
  allButtons.forEach(btn => {
      btn.classList.remove('active');
  });

  if (button) {
     button.classList.add('active');
  }

  let div = document.getElementById("div");
  div.innerHTML = "";
  let api = fetch("test.json");
  api.then((response) => {
      let changedData = response.json();
      changedData.then((result) => {
          let result1 = result.productsdata.slice(start, end);
          result1.forEach((i) => {
              div.innerHTML += `
                  <div class="card">
                      <img src="${i.image}"/>
                      <h4>${i.title}</h4>
                      <h4>${i.category}</h4>
                      <h4>Price : ${i.price}</h4>
                      <h4> Rating : ${i.rating.rate}</h4>
                      <button class="add-to-cart-btn" data-id="${i.id}" data-title="${i.title}" data-price="${i.price}">Add to Cart</button>
                  </div>
              `;
          });
      });
  });
}

window.onload = function () {   
  const firstButton = document.querySelector('.btn2');
  // showData(0, 10, firstButton);
};





// search

var newStr = "";
function HandleClick(e) {
  let input = e.target.value;
  newStr = input;
}
function HandleClick2() {
  let div = document.getElementById("div");
  div.innerHTML = "";
  let api = fetch("test.json");
  api.then((response) => {
    let changedData = response.json();
    changedData.then((result) => {
      let result1= result.productsdata

        result1.map((i) => {
            if (i.title  == newStr || i.category == newStr ) {

     div.innerHTML += `
      <div class="card">
      <img src="${i.image}"/>
     <h4>${i.title}</h4>
     <h4>${i.category}</h4>
      <h4>Price : ${i.price}</h4>
      <h4>Rating : ${i.rating.rate}</h4>
           <button class="add-to-cart-btn" data-id="${i.id}" data-title="${i.title}" data-price="${i.price}">Add to Cart</button>
      </div>
      `;
        }
      });
    });
  });
}




// filtration


let productsData = [];

fetch("test.json")
  .then(response => response.json())
  .then(data => {
    productsData = data.productsdata; 
  })
  
function displayProducts(products) {
  const div = document.getElementById("div");
  div.innerHTML = ""; 
  products.forEach(product => {
    div.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.title}" />
        <h4>${product.title}</h4>
        <h4>${product.category}</h4>
        <h4>Price: $${product.price}</h4>
        <h4>Rating: ${product.rating.rate}</h4>
        <button class="add-to-cart-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Add to Cart</button>
      </div>
    `;
  });
  document.getElementById("results-count").innerText = `Showing ${products.length} results`;
}


function filterp() {
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || 100000000000;

  const filteredProducts = productsData.filter(product => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

  displayProducts(filteredProducts);
}

function resetfilter() {
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";

  displayProducts(productsData);
}




// Add to cart
let cart = [];
let productsData1 = []; 

fetch("test.json")
    .then(response => response.json())
    .then(data => {
        productsData1 = data.productsdata; 
        showData(0, 10); 
    })

function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    if (cartDropdown.style.display === "block") {
        cartDropdown.style.display = "none";
    } else {
        cartDropdown.style.display = "block";
        updateCartDisplay();
    }
}

function addToCart(productId, productTitle, productPrice) {
    const product = productsData1.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 }); 
        }
        updateCartCount();
        updateCartDisplay();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = ""; // Clear previous items

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
                <div class="cart-item-details">
                    <p>${item.title} (x${item.quantity})</p>
                    <p>₹${itemTotal.toFixed(2)}</p>
                </div>
                <button class="remove-item" onclick="removeItem(${index})">X</button>
            </div>
        `;
    });

    totalPrice.textContent = total.toFixed(2); 
  }

// remove X
function removeItem(index) {
    cart.splice(index, 1); 
    updateCartCount();
    updateCartDisplay();
}

// clear cart
function clearCart() {
    cart = [];
    updateCartCount();
    updateCartDisplay();
}
// buynow
function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items to proceed.");
    } else {
        alert("Thank you for your purchase!");
        clearCart(); 
    }
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        const productTitle = event.target.getAttribute("data-title");
        const productPrice = parseFloat(event.target.getAttribute("data-price"));
        addToCart(productId, productTitle, productPrice);
    }
});












