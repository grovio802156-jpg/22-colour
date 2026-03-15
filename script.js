function runCode(){

let code=document.getElementById("code").value;
let preview=document.getElementById("preview");

preview.srcdoc=code;

}

function downloadCode(){

let code=document.getElementById("code").value;

let blob=new Blob([code],{type:"text/html"});
let a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="app.html";

a.click();

}    squaresContainer.appendChild(sq);
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
