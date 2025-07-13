let gameSeq = [];
let userSeq = [];

let btns = ["red","orange","green","blue"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userBtnFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    hScore(level);

    let ranIdx = Math.floor(Math.random() * 3);
    let ranCol = btns[ranIdx];

    gameSeq.push(ranCol);
    console.log("game seq = ",gameSeq);
    
    let ranBtn = document.querySelector(`.${ranCol}`);

    // console.log(ranIdx);
    // console.log(ranCol);
    // console.log(ranBtn);

    btnFlash(ranBtn);

}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `GAME OVER! Your Score was <b>${level}</b> <br>Press any key to Restart`;
       
        reset();
        bodyFlash();
    }
}

function btnPress(){
    let btn = this;
    userBtnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("user seq =",userSeq);

    checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function bodyFlash(){
     let body = document.querySelector("body");
     body.classList.add("gameOver");
     setTimeout(function(){
        body.classList.remove("gameOver");
    },150);
}

function hScore(level){
    if(level > highScore){
        highScore = level-1;
        console.log("high score is = ",highScore);
    }

    let h3 = document.querySelector("h3");
    h3.innerText = `High Score ${highScore}`;
}