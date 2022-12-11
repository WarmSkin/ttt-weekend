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
let player1Turn = true, playerMoved = false, isWin = false;
let index1, index2, moveCount = 0, player1Imag, player2Imag, aiMove = false;


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
document.querySelector("#AI").addEventListener('click', e => aiMove = !aiMove);



/*-------------------------------- Functions --------------------------------*/
player1Imag = imagSrc[0], player2Imag = imagSrc[1];
player1NameEl.textContent = nameData[0], player2NameEl.textContent = nameData[1];


function play(e) {
    playerMove(e);
    computerMove();
    checkWinner();
    render();
    updateStatusTable();
}

function playerMove(e){
    if(!isWin) {
        updateGameStatus(e);
    }
}
function computerMove() {
    if(computerMove){
        toWinMove();//if there is any move make sum to -3
        defMove();//check if there is any move make sum of 3, or 2 sums of 2.
        attackMove();//check if there is any move make 2 sums of -2. if not, make the most sum move.
    }
    // winStaus[index1] += value;
    //     winStaus[index2 + 3] += value;
    //     if(index1 === index2)
    //         winStaus[6] += value;
    //     if(index1 + index2 === 2)
    //         winStaus[7] += value;     //use this to simulate.
}
function updateGameStatus(e) {
    let id = e.target.id;
    index1 = +id[0];
    index2 = +id[1];
    if(!board[index1][index2]) {
        moveCount++;
        let value = player1Turn ? 1 : -1;
        playerMoved = true;
        //update html block
        e.target.children[0].src = player1Turn ? player1Imag : player2Imag ;
        //update board data
        board[index1][index2] = value;

        //updata winStaus data -- reduced from the checkWinner function below.
        
        winStaus[index1] += value;
        winStaus[index2 + 3] += value;
        if(index1 === index2)
            winStaus[6] += value;
        if(index1 + index2 === 2)
            winStaus[7] += value;
    }
}

function checkWinner() {
    isWin = winStaus.some(x => x === 3 || x === -3);
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
        (`The Winner is ${player1Turn ? player1NameEl.textContent : player2NameEl.textContent} !`)
        confetti.start(1500);
        animateCSS(`${player1Turn ? "#imgLeft" : "#imgRight"}`, 'bounce');
    }
    else {
        if(moveCount === 9) 
            messageEl.textContent = `Nice try. But it is a tie! `
        else if (playerMoved){
            player1Turn = !player1Turn;
            playerMoved = false;
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
    //reset on board staus
    updateStatusTable();
}

function updateStatusTable() {
    for(let i = 0; i < 8; i++)
        document.getElementById(`${i}`).textContent = winStaus[i];
}

//random pick the player picture and the name.
function randomPick(e) {

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
    }
    
}

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