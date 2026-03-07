let balance = 1200;

function deposit(){

let amount = prompt("Enter deposit amount");

if(amount){

balance += parseInt(amount);

updateBalance();

}

}

function withdraw(){

let amount = prompt("Enter withdraw amount");

if(amount <= balance){

balance -= parseInt(amount);

updateBalance();

}

else{

alert("Not enough balance");

}

}

function updateBalance(){

document.getElementById("balance").innerText = "₹" + balance;

}

function openGame(name){

alert(name + " game starting");

}

function home(){

alert("Home Page");

}

function activity(){

alert("Activity Page");

}

function promotion(){

alert("Promotion Page");

}

function account(){

alert("Account Page");

}
