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
        balance: 0,
        history: [] // added history array
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

// ==========================
// Logout
// ==========================
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
<h4>History</h4>
<div id="gameHistory" style="text-align:left; max-height:150px; overflow:auto;"></div>
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
let betLocked = false;

function placeBet(amount){
    if(betLocked) return; // lock after 5s
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
    if(betLocked) return;
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
    betLocked = false;
    
    timerInterval = setInterval(()=>{
        countdown--;
        document.getElementById("timer").innerText = "Timer: " + countdown;
        if(countdown <= 5){
            betLocked = true; // lock betting last 5s
        }
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

    let win = Math.random() < 0.5; // 50% chance
    if(win){
        let winAmount = currentBet * 2;
        user.balance += winAmount;
        document.getElementById("result").innerText = "You Won ₹" + winAmount + "!";
        user.history.push({square: winningIndex+1, bet: currentBet, result: "Win", time: new Date().toLocaleTimeString()});
    } else {
        document.getElementById("result").innerText = "You Lost ₹" + currentBet;
        user.history.push({square: winningIndex+1, bet: currentBet, result: "Lose", time: new Date().toLocaleTimeString()});
    }
    currentBet = 0;
    update();
    renderHistory();
}

function renderHistory(){
    const histDiv = document.getElementById("gameHistory");
    histDiv.innerHTML = user.history.map(h=>`[${h.time}] Square ${h.square} Bet ₹${h.bet} → ${h.result}`).join("<br>");
}
