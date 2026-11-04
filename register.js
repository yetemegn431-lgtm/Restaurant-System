function register(){

let username=document.getElementById("username").value;

let email=document.getElementById("email").value;

let password=document.getElementById("password").value;

let confirm=document.getElementById("confirmPassword").value;

if(username===""||email===""||password===""){

alert("Fill all fields");

return;

}

if(password!==confirm){

alert("Passwords do not match");

return;

}

let user={

username:username,

email:email,

password:password

};

localStorage.setItem("user",JSON.stringify(user));

alert("Registration Successful");

window.location.href="login.html";

}