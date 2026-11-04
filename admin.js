// Check Admin Login
if (localStorage.getItem("adminLogin") !== "true") {
    window.location.href = "login.html";
}

// Load Orders
let history = JSON.parse(localStorage.getItem("history")) || [];

// Dashboard
document.getElementById("orders").innerText = history.length;
document.getElementById("customers").innerText = history.length;

let totalSales = 0;
let table = document.getElementById("tableData");

history.forEach(order => {

    totalSales += order.total;

    table.innerHTML += `
    <tr>
        <td>${order.orderNo}</td>
        <td>${order.name}</td>
        <td>${order.payment}</td>
        <td>${order.total} ETB</td>
        <td>${order.date}</td>
    </tr>
    `;

});

document.getElementById("sales").innerText = totalSales + " ETB";

// Logout
function logout(){
    localStorage.removeItem("adminLogin");
    location.href="login.html";
}
window.logout = logout;
// Today's Sales
let today = new Date().toLocaleDateString();

let todaySales = 0;
let monthSales = 0;

let foodCount = {};

history.forEach(order => {

    if(order.date && order.date.includes(today)){
        todaySales += order.total;
    }

    monthSales += order.total;

    if(order.items){

        order.items.forEach(item=>{

            if(foodCount[item.name]){
                foodCount[item.name] += item.qty;
            }else{
                foodCount[item.name] = item.qty;
            }

        });

    }

});

document.getElementById("todaySales").innerText =
todaySales + " ETB";

document.getElementById("monthSales").innerText =
monthSales + " ETB";

// Best Selling Food

let bestFood = "-";
let max = 0;

for(let food in foodCount){

    if(foodCount[food] > max){

        max = foodCount[food];
        bestFood = food;

    }

}

document.getElementById("bestFood").innerText = bestFood;

// Sales Chart

let foodNames = [];
let foodQty = [];

for(let food in foodCount){

    foodNames.push(food);
    foodQty.push(foodCount[food]);

}

new Chart(document.getElementById("salesChart"),{

    type:"bar",

    data:{
        labels:foodNames,
        datasets:[{
            label:"Foods Sold",
            data:foodQty,
            backgroundColor:"#ff5722"
        }]
    },

    options:{
        responsive:true,
        plugins:{
            legend:{
                display:false
            }
        }
    }

});