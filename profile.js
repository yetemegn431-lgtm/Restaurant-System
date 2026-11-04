let user = JSON.parse(localStorage.getItem("user"));

if(user){

    document.getElementById("username").value = user.username || "";

    document.getElementById("email").value = user.email || "";

    document.getElementById("phone").value = user.phone || "";

    document.getElementById("address").value = user.address || "";

}

function saveProfile(){

    user.username = document.getElementById("username").value;

    user.email = document.getElementById("email").value;

    user.phone = document.getElementById("phone").value;

    user.address = document.getElementById("address").value;

    localStorage.setItem("user",JSON.stringify(user));

    alert("Profile Updated Successfully!");

}