let user = localStorage.getItem("user")

if(!user){

let phone = prompt("Enter Phone Number")

let id = Math.floor(Math.random()*1000000)

let ref = "REF"+id

let data = {
phone:phone,
id:id,
ref:ref,
balance:0
}

localStorage.setItem("user",JSON.stringify(data))

}

let data = JSON.parse(localStorage.getItem("user"))

document.getElementById("userid").innerText = "User ID : "+data.id
document.getElementById("refid").innerText = data.ref
document.getElementById("balance").innerText = "₹"+data.balance


function addMoney(){

data.balance +=100

update()

}

function withdraw(){

data.balance -=100

update()

}

function update(){

localStorage.setItem("user",JSON.stringify(data))

document.getElementById("balance").innerText = "₹"+data.balance

}


function logout(){

localStorage.removeItem("user")

location.reload()

}


function showPage(p){

document.querySelectorAll(".page").forEach(e=>e.style.display="none")

document.getElementById(p).style.display="block"

}
