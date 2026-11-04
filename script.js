let foods = JSON.parse(localStorage.getItem("foods")) || [
  { name:"Burger", price:250, category:"Fast Food", image:"./image/burger.jpg" },
  { name:"Pizza", price:350, category:"Fast Food", image:"./image/pizza.jpg" },
  { name:"Shawarma", price:180, category:"Fast Food", image:"./image/shawarma.jpg" },

  { name:"Coca Cola", price:60, category:"Drink", image:"./image/cocacola.jpg" },
  { name:"Orange Juice", price:120, category:"Drink", image:"./image/orange_juice.jpg" },
  { name:"Pepsi", price:60, category:"Drink", image:"./image/pepsi.jpg" },
  { name:"Tea", price:40, category:"Drink", image:"./image/tea.jpg" },
  { name:"Beer", price:120, category:"Drink", image:"./image/beer.jpg" },

  { name:"Sandwich", price:150, category:"Snack", image:"./image/sandwich.jpg" },

  { name:"Doro Wot", price:280, category:"Traditional", image:"./image/doro_wot.jpg" }
];


let cart = [];

/* LOAD CART */
function loadCart(){
    let data = localStorage.getItem("cart");
    if(data){
        cart = JSON.parse(data);
    }
}

/* SAVE CART */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* DISPLAY FOODS */
function displayFoods(list){

    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    list.forEach((food,index)=>{

        menu.innerHTML += `
        <div class="card">

            <img src="${food.image}" alt="${food.name}">

            <h3>${food.name}</h3>

            <p>${food.price} ETB</p>

            <button onclick="addToCart(${index})">Add</button>

        </div>
        `;

    });

}

/* ADD */
function addToCart(index){

    let item = foods[index];

    let found = cart.find(c=>c.name===item.name);

    if(found){
        found.qty++;
    }else{
        cart.push({...item, qty:1});
    }

    saveCart();
    renderCart();

}

/* + */
function increaseQty(i){
    cart[i].qty++;
    saveCart();
    renderCart();
}

/* - */
function decreaseQty(i){

    if(cart[i].qty>1){
        cart[i].qty--;
    }else{
        cart.splice(i,1);
    }

    saveCart();
    renderCart();

}

/* REMOVE */
function removeItem(i){

    cart.splice(i,1);

    saveCart();

    renderCart();

}

/* CART */
function renderCart(){

    const div = document.getElementById("cart-items");

    div.innerHTML = "";

    let total = 0;

    cart.forEach((item,i)=>{

        total += item.price * item.qty;

        div.innerHTML += `

        <div class="cart-item">

            <b>${item.name}</b><br>

            <button onclick="decreaseQty(${i})">➖</button>

            <span>${item.qty}</span>

            <button onclick="increaseQty(${i})">➕</button>

            <span>${item.price * item.qty} ETB</span>

            <button onclick="removeItem(${i})">❌</button>

        </div>

        <hr>

        `;

    });

    document.getElementById("total").innerText = total;

}

/* SEARCH */

document.getElementById("search").addEventListener("input",(e)=>{

    let value = e.target.value.toLowerCase();

    let filtered = foods.filter(food=>
        food.name.toLowerCase().includes(value)
    );

    displayFoods(filtered);

});
document.getElementById("category").addEventListener("change", function(){

    let category = this.value;

    if(category === "All"){

        displayFoods(foods);
if(!localStorage.getItem("foods")){
    localStorage.setItem("foods", JSON.stringify(foods));
}

    }else{

        let filtered = foods.filter(food => food.category === category);

        displayFoods(filtered);

    }

});

/* SEARCH BY PRICE */

document.getElementById("priceSearch").addEventListener("input", function(){

    let price = this.value;

    if(price === ""){

        displayFoods(foods);

        return;
    }

    let filtered = foods.filter(food => food.price <= Number(price));

    displayFoods(filtered);

});

/* CHECKOUT */

document.getElementById("checkout").addEventListener("click", async () => {

    if(cart.length===0){
        alert("Cart empty!");
        return;
    }

    let name=document.getElementById("custName").value;
    let phone=document.getElementById("custPhone").value;
     let email = document.getElementById("custEmail").value;
    let address=document.getElementById("custAddress").value;
    let payment=document.getElementById("payment").value;

    if(name==="" || phone==="" || email==="" || address===""){
        alert("Customer information ");
        return;
    }

    let total=0;

    cart.forEach(item=>{
        total += item.price * item.qty;
    });

   const receipt = {

    orderNo: "ORD-" + Math.floor(Math.random()*1000000),

    name: name,

    phone: phone,

    email: email,

    address: address,

    payment: payment,

    items: cart,

    total: total

};
/* SAVE ORDER HISTORY */

let history = JSON.parse(localStorage.getItem("history")) || [];

receipt.date = new Date().toLocaleString();

history.push(receipt);

localStorage.setItem("history", JSON.stringify(history));

/* SAVE TO LOCAL STORAGE */

localStorage.setItem("receipt", JSON.stringify(receipt));

cart = [];

saveCart();

renderCart();

window.location.href = "receipt.html";

});

/* START */

loadCart();

renderCart();

displayFoods(foods);
/* DARK MODE */

const darkBtn = document.getElementById("darkModeBtn");

// Load saved mode
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    darkBtn.innerHTML = "☀️ Light Mode";
}

// Toggle
darkBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        darkBtn.innerHTML="☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");

        darkBtn.innerHTML="🌙 Dark Mode";

    }

});
window.addToCart = addToCart;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeItem = removeItem;