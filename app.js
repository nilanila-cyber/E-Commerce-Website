//cart//

const cartButtons = document.querySelectorAll(".cart");
cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.closest(".product-card");
        if (!product) {
            alert("Product not found!");
            return;
        }
        const name = product.dataset.name;
        const price = Number(product.dataset.price);
        const image = product.dataset.image;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(name + " added to cart!");
    });
});
//buy//
const buyButtons=document.querySelectorAll(".buy");
buyButtons.forEach((button)=>{
    button.addEventListener("click",()=> {
        const product=button.closest(".product-card");
        const buyProduct={
            name:product.dataset.name,
            price:product.dataset.price,
            image:product.dataset.image,
            quantity:1
        };
        localStorage.setItem("buyNow",JSON.stringify(buyProduct));
        window.location.href="checkout.html";
    });
});
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");
if (cartContainer) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>Price : ₹${item.price}</p>
                    <p>Quantity : ${item.quantity}</p>
                    <button class="remove-btn" data-name="${item.name}">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });
    totalPrice.innerHTML = "Total : ₹" + total;
}
//Remove cart
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
        const name = e.target.dataset.name;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.name !== name);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
});
//buy now product display//
const buyContainer=document.getElementById("buy-product");
if(buyContainer){
    const product=JSON.parse(localStorage.getItem("buyNow"));
    if(product){
        buyContainer.innerHTML=`
        <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-details">
        <h2>${product.name}</h2>
        <p>price:₹${product.price}</p>
        <p>Quantity : ${product.quantity}</p>
        </div>
        </div>
        `;
    }
    else{
        buyContainer.innerHTML="<h2>No Product Selected</h2>";
    }
    }
// Place Order
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();
        const order = JSON.parse(localStorage.getItem("buyNow"));

let orders = JSON.parse(localStorage.getItem("orders")) || [];

if(order){
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

        alert("🎉 Order Placed Successfully!");

        localStorage.removeItem("buyNow");
        localStorage.removeItem("cart");

        window.location.href = "success.html";

    });
}
//search
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");

if (searchBtn && searchInput) {

    searchBtn.onclick = function () {

        let value = searchInput.value.trim().toLowerCase();

        switch (value) {
            case "floral dress":
            case "floral":
            case "dress":
                location.href = "women.html";
                break;

            case "long maxi":
            case "gown":
                location.href = "women.html";
                break;

            case "shirt":
            case "blue cotton shirt":
            case "pink cotton shirt":
                location.href = "men.html";
                break;

            case "kids":
            case "kids dress":
                location.href = "kids.html";
                break;

            case "shoes":
            case "sports shoes":
                location.href = "shoes.html";
                break;

            case "beauty":
            case "lipstick":
                location.href = "beauty.html";
                break;

            case "bag":
            case "hand bag":
                location.href = "bag.html";
                break;

            default:
                alert("Product Not Found");
        }

    };

}
// Wishlist
const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const product = button.closest(".product-card");

        const name = product.dataset.name;
        const price = Number(product.dataset.price);
        const image = product.dataset.image;

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const existing = wishlist.find(item => item.name === name);

        if (!existing) {
            wishlist.push({
                name: name,
                price: price,
                image: image
            });

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            alert(name + " added to Wishlist ❤️");
        }
        else {
            alert("Already in Wishlist ❤️");
        }

    });
});
// Display Wishlist
const wishlistContainer = document.getElementById("wishlist-container");

if (wishlistContainer) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<h2>Your Wishlist is Empty ❤️</h2>";
    } else {

        wishlist.forEach(item => {

            wishlistContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <div class="quantity">
    <button class="qty-btn minus" data-name="${item.name}">-</button>

    <span>${item.quantity}</span>

    <button class="qty-btn plus" data-name="${item.name}">+</button>
</div>
                        <button class="wishlist-remove" data-name="${item.name}">
                                Remove
                        </button>
                    </div>
                </div>
            `;

        });

    }

}
// Remove Wishlist Item

document.addEventListener("click", function(e){

    if(e.target.classList.contains("wishlist-remove")){

        const name = e.target.dataset.name;

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        wishlist = wishlist.filter(item => item.name !== name);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert(name + " removed from Wishlist ❤️");

        location.reload();

    }

});
// Cart Quantity Update

document.addEventListener("click", function(e){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(e.target.classList.contains("plus")){

        let name = e.target.dataset.name;

        let product = cart.find(item => item.name === name);

        product.quantity++;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }


    if(e.target.classList.contains("minus")){

        let name = e.target.dataset.name;

        let product = cart.find(item => item.name === name);

        if(product.quantity > 1){
            product.quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();
    }

});
// ================= SIGN UP =================

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.addEventListener("click", function () {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if (name === "" || email === "" || password === "") {
            alert("Please fill all fields!");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Account Created Successfully!");

        window.location.href = "login.html";

    });

}
// ================= LOGIN =================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("No account found! Please Sign Up first.");
            return;
        }

        if (email === user.email && password === user.password) {

            alert("Login Successful!");

            localStorage.setItem("isLoggedIn", "true");

            window.location.href = "index.html";

        } else {

            alert("Invalid Email or Password!");

        }

    });

}
// Check Login Status

if (localStorage.getItem("isLoggedIn") === "true") {

    const user = JSON.parse(localStorage.getItem("user"));

    const userIcon = document.getElementById("user-name");

    if (userIcon) {
        userIcon.innerHTML = "Hi, " + user.name;
    }

}
// User Login Display & Logout

const userName = document.getElementById("user-name");

if (userName) {

    const loggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (loggedIn === "true" && user) {

        userName.innerHTML = "Hi, " + user.name + " | Logout";

        userName.addEventListener("click", function (e) {

            e.preventDefault();

            if (confirm("Do you want to Logout?")) {

                localStorage.removeItem("isLoggedIn");

                alert("Logged Out Successfully!");

                window.location.href = "login.html";
            }

        });

    } else {

        userName.innerHTML = '<i class="fa-solid fa-user"></i>';

        userName.href = "login.html";

    }

}
// ================= PROFILE =================

const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");

if(profileName && profileEmail){

    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
        profileName.textContent = user.name;
        profileEmail.textContent = user.email;
    }else{
        window.location.href = "login.html";
    }

}

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",function(){

        localStorage.removeItem("isLoggedIn");

        alert("Logged Out Successfully!");

        window.location.href="login.html";

    });

}
const ordersList = document.getElementById("orders-list");

if(ordersList){

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if(orders.length === 0){

        ordersList.innerHTML = "<h3>No Orders Yet</h3>";

    }else{

        orders.forEach(item=>{

            ordersList.innerHTML += `
                <div class="order-item">

                    <img src="${item.image}">

                    <div>

                        <h3>${item.name}</h3>

                        <p>Price : ₹${item.price}</p>

                        <p>Quantity : ${item.quantity}</p>

                        <p style="color:green;">✔ Delivered</p>

                    </div>

                </div>
            `;

        });

    }

}
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});