/*Author: Pin 
Date: 12/9/2022
Description: Using 2 dimentional array to represent the ttt board data.
            Use sum of each direction of board to determine a winner. 
*/
import {imagSrc, nameData} from "./data.js";
/*-------------------------------- Constants --------------------------------*/
const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

//winStaus index|| 0,1,2 :horizontal sum of board || 3,4,5: vertical sum || 6,7: cross sum.
const winStaus = [0,0,0,0,0,0,0,0];


/*---------------------------- Variables (state) ----------------------------*/
let player1Turn = true, playerMoved = false, aiMoved = false, isWin = false, start = false;
let index1, index2, moveCount = 0, player1Imag, player2Imag, moveValue;
let aiMove = false, aiDefence = false, aiAttack = false;

// const clickSoundEl = new Audio('');


/*------------------------ Cached Element References ------------------------*/
let messageEl = document.getElementById("message");
let boardEl = document.querySelector(".board");
// let statusEl = document.querySelector(".status");
let imgEl = document.querySelectorAll(".img1");
let player1NameEl = document.querySelector("#bt0");
let player2NameEl = document.querySelector("#bt1");
let imgLeftEl = document.querySelector("#imgLeft");
let imgRightEl = document.querySelector("#imgRight");

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', play);
document.querySelector("#reset").addEventListener('click', reset);
player1NameEl.addEventListener('click', randomPick);
player2NameEl.addEventListener('click', randomPick);
document.querySelector("#AI").addEventListener('click', aiEnable);
document.querySelector("#start").addEventListener('click', startGame )



/*-------------------------------- Functions --------------------------------*/
player1Imag = imagSrc[0], player2Imag = imagSrc[1];
player1NameEl.textContent = nameData[0], player2NameEl.textContent = nameData[1];

function startGame(e) {
    start = true;
    document.querySelector(".board").style.opacity = "1";
    messageEl.textContent = `Game Start! ${player1NameEl.textContent}'s turn`;
}

function aiEnable(e) {
    aiMove = !aiMove;
    let aiPlayer = player1Turn ? player2NameEl : player1NameEl;
    let nameStored = aiPlayer.textContent;
    if(aiMove){
        e.target.textContent = `😈${nameStored}`;
    }
    else{
        e.target.textContent = "Play VS AI";
    }
}

function play(e) {
    if(start){
        // clickSoundEl.play();
        playerMove(e);
        checkWinner();
        render();

        //Ai's turn
        if(aiMove && !isWin){
            computerMove();
            checkWinner();
            render();
        }
    }
    // updateStatusTable();
}

function playerMove(e){
    if(!isWin) {
        updateGameStatus(e);
    }
}

function updateGameStatus(e) {
    //if it is not aiMove, geting indexs from click target
    if(e){
        //double check if it clicked on img (which has no id)
        if(e.target.id) {
        let id = e.target.id;
        index1 = +id[0];
        index2 = +id[1];
        }
    }

    if(!board[index1][index2]) {
        moveCount++;
        moveValue = player1Turn ? 1 : -1;
        if(e) playerMoved = true;
        else aiMoved = true;

        //update html block
        document.getElementById(`${index1}${index2}`).children[0].src = player1Turn ? player1Imag : player2Imag ;
        //update board data
        board[index1][index2] = moveValue;

        //updata winStaus data -- reduced from the checkWinner function below.
        winStaus[index1] += moveValue;
        winStaus[index2 + 3] += moveValue;
        if(index1 === index2) 
            winStaus[6] += moveValue;
        if(index1 + index2 === 2)
            winStaus[7] += moveValue;
    }
}

function checkWinner() {
    isWin = winStaus.some(x => Math.abs(x) === 3);
}
// function checkWinner() {
//     winStaus[0] = board[0][0] + board[0][1] + board[0][2];
//     winStaus[1] = board[1][0] + board[1][1] + board[1][2];
//     winStaus[2] = board[2][0] + board[2][1] + board[2][2];
//     winStaus[3] = board[0][0] + board[1][0] + board[2][0];
//     winStaus[4] = board[0][1] + board[1][1] + board[2][1];
//     winStaus[5] = board[0][2] + board[1][2] + board[2][2];
//     winStaus[6] = board[0][0] + board[1][1] + board[2][2];
//     winStaus[7] = board[0][2] + board[1][1] + board[2][0];
//     isWin = winStaus.some(x => x === 3 || x === -3);
// }


function render() {
    if(isWin){
        messageEl.textContent = 
        (`The Winner is ${aiMoved? "😈": ""} ${player1Turn ? player1NameEl.textContent : player2NameEl.textContent} !`)
        confetti.start(1500);
        animateCSS(`${player1Turn ? "#imgLeft" : "#imgRight"}`, 'bounce');
    }
    else {
        if(moveCount === 9) {
            messageEl.textContent = `Nice try. But it is a tie! `
            aiMove = false;
        }
        else if (playerMoved || aiMoved){
            player1Turn = !player1Turn;
            playerMoved = false;
            aiMoved = false;
            messageEl.textContent = `${player1Turn ? player1NameEl.textContent : player2NameEl.textContent}'s turn:`;
        }
    }
}

function reset() {
    player1Turn = true;
    isWin = false;
    moveCount = 0;
    winStaus.forEach((x,i) => winStaus[i] = 0);
    board.forEach(x => x.forEach((x, i, arr) => arr[i] = 0));
    messageEl.textContent = "Welcome to Tic-Tac-Toe";
    imgEl.forEach(x => x.src = "");
    aiMove = false;
    document.querySelector("#AI").textContent = "Play VS PC"
    start = false;
    document.querySelector(".board").style.opacity = "0";
    imgLeftEl.src = imagSrc[0];
    imgRightEl.src = imagSrc[1];
    player1Imag = imagSrc[0]; 
    player2Imag = imagSrc[1];
    player1NameEl.textContent = nameData[0];
    player2NameEl.textContent = nameData[1];
    //reset on board staus
    // updateStatusTable();
}

// function updateStatusTable() {
//     for(let i = 0; i < 8; i++)
//         document.getElementById(`${i}`).textContent = winStaus[i];
// }


//PLAYER PROFILE
//####################################################################################
function randomPick(e) {
    if(!start){
        let randomIndex = Math.floor(Math.random()*nameData.length);
        
        if(e.target.id === 'bt0'){
            player1Imag  = imagSrc[randomIndex];
            player1NameEl.textContent = nameData[randomIndex];
            imgLeftEl.src = player1Imag;
            animateCSS('#imgLeft', 'bounce');
        }
        else {
            player2Imag  = imagSrc[randomIndex];
            player2NameEl.textContent = nameData[randomIndex];
            imgRightEl.src = player2Imag;
            animateCSS('#imgRight', 'bounce');
            if(aiMove)
                document.querySelector("#AI").textContent = "😈" + nameData[randomIndex];
        }
        

    }
    
}

//AI
//####################################################################################
function computerMove() {
    if(moveCount <= 1 && !board[1][1]){
            index1 = 1;
            index2 = 1;
    }
    else{
        toWinMove();//if there is any move make sum to abs(3) to win
        if(aiDefence)
            defMove();//check if there is any move make sum of 3, or 2 sums of 2.
            if(aiAttack)
                attackMove();//check if there is any move make 2 sums of 2. if not, make the most sum move.
    }
    updateGameStatus();
}

function toWinMove() {
    moveValue = player1Turn ? 1 : -1;
    simulateWinMove(1,3);
    //if the function didn't break, then we didn't find wining move, we need to defence.
    console.log("toWinMove");
}

function defMove() {
    moveValue = player1Turn ? -1 : 1;
    simulateWinMove(1,3);
    console.log("def stage 1");
    if(aiDefence){
        moveValue = - moveValue;
        simulateWinMove(2,2);
        console.log("def stage 2");
    }
    if(aiDefence){
        moveValue = -moveValue;
        simulateWinMove(2,2);
        console.log("def stage 3");
    }
    moveValue = -moveValue;
    console.log("defMove");
}

function attackMove() {
    simulateWinMove(1,2);
    if(attackMove)
        simulateWinMove(1,1)
    console.log("attackMove");
}
function simulateWinMove(targetCount, targetNumber) {
    let count = 0;
    let indexFound = false;
    aiDefence = true;
    aiAttack = true;
    for(index1 = 0; index1 < 3; index1 ++){
        for(index2 = 0; index2 <3; index2 ++){
            if(!board[index1][index2]){
                if((Math.abs(winStaus[index1] + moveValue) === targetNumber)) count++;
                if(Math.abs(winStaus[index2 + 3] + moveValue) === targetNumber) count++;
                if(index1 === index2 &&(Math.abs(winStaus[6] + moveValue) === targetNumber)) count++;
                if(index1 + index2 === 2 && (Math.abs(winStaus[7] + moveValue) === targetNumber)) count++;
                if(count >= targetCount) {indexFound = true; break;}
                count = 0;
            }
        }
        if (indexFound === true) {
            aiDefence = false; 
            aiAttack = false; 
            break; }
    }
    // console.log(aiAttack);
}


//ANIMATION
//####################################################################################
//copied from animate.style
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });