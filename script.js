// ==========================
// User & Wallet System
// ==========================
let user = JSON.parse(localStorage.getItem("user"));

if(!user){
    let phone = prompt("Enter Phone Number");
    let id = Math.floor(Math.random()*1000000);
    let ref = "REF"+id;
    user = {
        phone: phone,
        id: id,
        ref: ref,
        balance: 0
    };
    localStorage.setItem("user", JSON.stringify(user));
}

document.getElementById("userid").innerText = "User ID: " + user.id;
document.getElementById("refid").innerText = user.ref;
document.getElementById("balance").innerText = "₹" + user.balance;

function addMoney(){
    user.balance += 100;
    update();
}

function withdraw(){
    if(user.balance >= 100){
        user.balance -= 100;
        update();
    } else {
        alert("Low balance");
    }
}

function update(){
    localStorage.setItem("user", JSON.stringify(user));
    document.getElementById("balance").innerText = "₹" + user.balance;
}

function logout(){
    localStorage.removeItem("user");
    location.reload();
}

// ==========================
// Page Navigation
// ==========================
function showPage(page){
    document.querySelectorAll(".page").forEach(p=>p.style.display="none");
    document.getElementById(page).style.display="block";
}

// ==========================
// Winner banner scroll
// ==========================
let banner = document.getElementById("winnerBanner");
if(banner){
    setInterval(()=>{
        banner.scrollLeft +=1;
        if(banner.scrollLeft >= banner.scrollWidth/banner.childElementCount){
            banner.scrollLeft=0;
        }
    },50);
}

// ==========================
// 22 Colour Game Logic
// ==========================
let gameContainer = document.createElement("div");
gameContainer.className = "game-container";
gameContainer.innerHTML = `
<h3>22 Colour Game</h3>
<div class="squares-container" id="squaresContainer"></div>
<div class="bet-options">
    <button onclick="placeBet(1)">₹1</button>
    <button onclick="placeBet(5)">₹5</button>
    <button onclick="placeBet(10)">₹10</button>
    <button onclick="placeBet(20)">₹20</button>
    <button onclick="placeBet(50)">₹50</button>
    <button onclick="placeBet(100)">₹100</button>
    <input type="number" id="customBet" placeholder="Custom" style="width:80px;">
    <button onclick="placeCustomBet()">Bet</button>
</div>
<div id="timer">Timer: 30</div>
<p id="result"></p>
`;
document.body.appendChild(gameContainer);

const squaresContainer = document.getElementById("squaresContainer");
let squares = [];
for(let i=0; i<9; i++){
    let sq = document.createElement("div");
    sq.className = "square";
    sq.innerText = i+1;
    squaresContainer.appendChild(sq);
    squares.push(sq);
}

let currentBet = 0;
let timerInterval;
let countdown = 30;

function placeBet(amount){
    if(user.balance < amount){
        alert("Low balance");
        return;
    }
    currentBet = amount;
    user.balance -= amount;
    update();
    startGame();
}

function placeCustomBet(){
    let val = parseInt(document.getElementById("customBet").value);
    if(!val || val<=0){
        alert("Enter valid amount");
        return;
    }
    if(user.balance < val){
        alert("Low balance");
        return;
    }
    currentBet = val;
    user.balance -= val;
    update();
    startGame();
}

function startGame(){
    document.getElementById("result").innerText = "";
    countdown = 30;
    document.getElementById("timer").innerText = "Timer: " + countdown;
    
    timerInterval = setInterval(()=>{
        countdown--;
        document.getElementById("timer").innerText = "Timer: " + countdown;
        if(countdown <= 0){
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}

function showResult(){
    // Randomly select winning square
    let winningIndex = Math.floor(Math.random()*squares.length);
    squares.forEach((sq, idx)=>{
        if(idx === winningIndex){
            sq.style.background = "green";
        } else {
            sq.style.background = "#ccc";
        }
    });

    // Win = double bet
    let winAmount = currentBet * 2;
    let loseAmount = currentBet;

    if(Math.random() < 0.5){ // 50% chance win
        user.balance += winAmount;
        document.getElementById("result").innerText = "You Won ₹" + winAmount + "!";
    } else {
        document.getElementById("result").innerText = "You Lost ₹" + loseAmount;
    }
    update();
    currentBet = 0;
  }
