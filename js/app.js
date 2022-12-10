/*Author: Pin 
Date: 12/9/2022
Description: Using 2 dimentional array to represent the ttt board data.
            Use sum of each direction of board to determine a winner. 
*/
import imagSrc from "./data.js";
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
let index1, index2, moveCount = 0, player1Imag, player2Imag;

player1Imag = imagSrc[0], player2Imag = imagSrc[1];

/*------------------------ Cached Element References ------------------------*/
let messageEl = document.getElementById("message");
let boardEl = document.querySelector(".board");
// let statusEl = document.querySelector(".status");
let imgEl = document.querySelectorAll(".img1")

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', play);
document.querySelector("#reset").addEventListener('click', reset);



/*-------------------------------- Functions --------------------------------*/

function play(e) {
    playerMove(e);
    checkWinner();
    render();
    updateStatusTable();
}

function playerMove(e){
    if(!isWin) {
        updateGameStatus(e);
    }
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

        //updata winStaus data -- yeah, all about math here.
        
        winStaus[index1] += value;
        winStaus[index2 + 3] += value;
        if(index1 === index2)
            winStaus[6] += value;
        if(index1 + index2 === 2)
            winStaus[7] += value;
    }
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

function checkWinner() {
    isWin = winStaus.some(x => x === 3 || x === -3);
}

function render() {
    if(isWin){
        messageEl.textContent = 
        (`The Winner is ${player1Turn ? "Player1" : "Player2"} !`)
    }
    else {
        if(moveCount === 9) 
            messageEl.textContent = `Nice try. But it is a tie! `
        else if (playerMoved){
            player1Turn = !player1Turn;
            playerMoved = false;
            messageEl.textContent = `${player1Turn ? "Player1" : "Player2"}'s turn:`
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