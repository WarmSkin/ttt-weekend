/*Author: Pin 
Date: 12/11/2022
Description: Using 2 dimentional array to represent the tic-tac-toe board data.
            Use sum of each direction of board to determine a winner.
            Build in AI player and background .
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
let player1Turn = true, playerMoved = false, aiMoved = false, isWin = false, start = false, makeMove = false;
let index1, index2, moveCount = 0, player1Imag = imagSrc[0], player2Imag = imagSrc[1], moveValue;
let aiMode = false, aiDefence = false, aiAttack = false;
const clickSoundEl = new Audio();

clickSoundEl.setAttribute("src", "./css/audio/487588__ranner__ui-click.wav")


/*------------------------ Cached Element References ------------------------*/
let messageEl = document.getElementById("message");
let boardEl = document.querySelector(".board");
let imgEl = document.querySelectorAll(".img1");
let player1NameEl = document.querySelector("#bt0");
let player2NameEl = document.querySelector("#bt1");
let imgLeftEl = document.querySelector("#imgLeft");
let imgRightEl = document.querySelector("#imgRight");

player1NameEl.textContent = nameData[0], player2NameEl.textContent = nameData[1];

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', play);
document.querySelector("#reset").addEventListener('click', reset);
player1NameEl.addEventListener('click', randomPick);
player2NameEl.addEventListener('click', randomPick);
document.querySelector("#AI").addEventListener('click', aiEnable);
document.querySelector("#start").addEventListener('click', startGame )



/*-------------------------------- Functions --------------------------------*/

function startGame(e) {
    start = true;
    document.querySelector(".board").style.opacity = "1";
    messageEl.textContent = `Let's Go! ${player1NameEl.textContent}'s turn`;
}

function aiEnable(e) {
    aiMode = !aiMode;
    let aiPlayer = player1Turn ? player2NameEl : player1NameEl;
    let nameStored = aiPlayer.textContent;
    if(aiMode) e.target.textContent = `😈${nameStored}`;
    else e.target.textContent = "Play VS AI";
}

function play(e) {
    if(start){
        playerPlay(e);
        //Ai's turn
        if(aiMode && !isWin && makeMove){
            aiComputerPlay();
        }
    }
    console.log(winStaus)
}

function playerPlay(e) {
    playerMove(e);
    clickSoundEl.volume = 1;
    clickSoundEl.play();
    checkWinner();
    render();
}

function aiComputerPlay(){
    computerMove();
    clickSoundEl.volume = 1;
    clickSoundEl.play();
    checkWinner();
    render();
}

function playerMove(e){
    if(!isWin) {
        updateGameStatus(e);
    }
}

function updateGameStatus(e) {
    //if it is not aiMode, geting indexs from click target
    if(e){
        //double check if it clicked on img (which has no id)
        if(e.target.id) {
        let id = e.target.id;
        index1 = +id[3];
        index2 = +id[4];
        }
    }
    makeMove = false;

    if(!board[index1][index2]) {
        moveCount++;
        makeMove = true;
        moveValue = player1Turn ? 1 : -1;
        if(e) playerMoved = true;
        else aiMoved = true;
        
        //update html block
        let sqrEl = document.getElementById(`sqr${index1}${index2}`).children[0];
        sqrEl.src = player1Turn ? player1Imag : player2Imag ;
        animateCSS("#"+sqrEl.id, 'bounceInDown');

        //update board data
        board[index1][index2] = moveValue;

        //updata winStaus data -- reduced from the checkWinner function below.
        winStaus[index1] += moveValue;
        winStaus[index2 + 3] += moveValue;
        if(index1 === index2) {winStaus[6] += moveValue;}
        if(index1 + index2 === 2) {winStaus[7] += moveValue;}
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
        clickSoundEl.setAttribute("src", "./css/audio/banana-scream.mp3")
        clickSoundEl.volume = 1;
        clickSoundEl.play();
    }
    else {
        if(moveCount === 9) {
            messageEl.textContent = `Nice try. But it is a tie! `
            aiMode = false;
        }
        else if (makeMove){
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
    aiMode = false;
    document.querySelector("#AI").textContent = "Play VS PC"
    start = false;
    document.querySelector(".board").style.opacity = "0";
    imgLeftEl.src = imagSrc[0];
    imgRightEl.src = imagSrc[1];
    player1Imag = imagSrc[0]; 
    player2Imag = imagSrc[1];
    player1NameEl.textContent = nameData[0];
    player2NameEl.textContent = nameData[1];
    clickSoundEl.setAttribute("src", "./css/audio/487588__ranner__ui-click.wav")
}

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
            if(aiMode) document.querySelector("#AI").textContent = "😈" + nameData[randomIndex];
        }
    } 
}

//AI
//####################################################################################
function computerMove() {
    //If player didn't pick center, take the center.
    if(moveCount <= 1 && !board[1][1]){
            index1 = 1;
            index2 = 1;
    }
    else{
        toWinMove();
        if(aiDefence)
            defMove();
            if(aiAttack)
                attackMove();
    }
    updateGameStatus();
}

//If there is a move cound reach winning(abs(3)), take the move.
function toWinMove() {
    moveValue = player1Turn ? 1 : -1;
    simulateWinMove(1,3);
    console.log("toWin", aiDefence);
}

//Take counter move if the opponent is going to win.
function defMove() {
    moveValue = player1Turn ? -1 : 1; //think as opponent
    simulateWinMove(1,3);
    console.log("toWin", aiDefence);
    //if the opponent is not winning on next round
    //special case when opponent places on a line up conners in first two move.
    if(aiDefence){
        specialCase();
    }
    console.log("🚀 ~ file: app.js:245 ~ defMove ~ aiDefence", aiDefence)
    //check if we could get a two abs(2) sum -- wich will likely win in next 2 round 
    if(aiAttack){
        moveValue = - moveValue;
        simulateWinMove(2,2);
    }
    console.log("🚀 ~ file: app.js:250 ~ defMove ~ aiAttack", aiAttack)
    //check if we need to stop opponent's next 2 abs(2) stage
    if(aiDefence){
        moveValue = -moveValue;
        simulateWinMove(2,2);
    }
    console.log("🚀 ~ file: app.js:256 ~ defMove ~ aiDefence", aiDefence)
    moveValue = -moveValue;
}

function specialCase() {
    if((board[0][0] && board[0][0] === board[2][2] ) || (board[0][2] && board[0][2] === board[2][0] )){
        index1 = 0, index2 = 1;
        aiAttack = false, aiDefence = false;
    }
    console.log("special")
    console.log( null === null);
}

function attackMove() {
    simulateWinMove(1,2);
    //if there is no target 2, then look for target 1
    if(attackMove) simulateWinMove(1,1)
}

//targetNumber: the sum we want to check from the 8 winning sums
//targetCount: how many sums in the 8 winning, reach the targetNumber
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
            } 
            count = 0;  //reset count when simulated each element
        }
        
        if (indexFound === true) {
            aiDefence = false; 
            aiAttack = false; 
            break; }
    }
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