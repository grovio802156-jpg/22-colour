let currentScreen = "screen1";

function showScreen(id){

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

document.getElementById(id).classList.add("active")

currentScreen = id

}

function addButton(){

let btn = document.createElement("button")

btn.innerText = "Button"

document.getElementById(currentScreen).appendChild(btn)

}

function saveProject(){

let data = document.querySelector(".phone").innerHTML

localStorage.setItem("project",data)

alert("Project Saved")

}

function exportProject(){

let data = document.querySelector(".phone").innerHTML

let blob = new Blob([data],{type:"text/html"})

let a = document.createElement("a")

a.href = URL.createObjectURL(blob)

a.download = "app.html"

a.click()

}}

function renderHistory(){
    const histDiv = document.getElementById("gameHistory");
    histDiv.innerHTML = user.history.map(h=>`[${h.time}] Square ${h.square} Bet ₹${h.bet} → ${h.result}`).join("<br>");
}
