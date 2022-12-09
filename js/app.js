/*Author: Pin 
Date: 12/9/2022
Description: Using 2 dimentional array to represent the ttt board data.
            Use sum of each direction of board to determine a winner. 
*/
/*-------------------------------- Constants --------------------------------*/
const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

//winStack index|| 0,1,2 :horizontal sum of board || 3,4,5: vertical sum || 6,7: cross sum.
const winStack = [0,0,0,0,0,0,0,0];

/*---------------------------- Variables (state) ----------------------------*/
let player1Turn = true, playerMoved = false, isWin = false;
let index1, index2, moveCount = 0;


/*------------------------ Cached Element References ------------------------*/
let messageEl = document.getElementById("message");
let boardEl = document.querySelector(".board");
let statusEl = document.querySelector(".status");

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
        playerMoved = true;
        //update html block
        // console.dir(e.target);
        e.target.children[0].src = player1Turn ? "https://ca.slack-edge.com/T0351JZQ0-U01B1M6SFE2-4835b653f856-512" : "https://ca.slack-edge.com/T0351JZQ0-UK7P5G0MA-2ddc03a7fe54-512";
        //update board data
        board[index1][index2] = player1Turn ? 1 : -1;

        //updata winStack data -- yeah, all about math here.
        let value = player1Turn ? 1 : -1;
        winStack[index1] += value;
        winStack[index2 + 3] += value;
        if(index1 === index2)
            winStack[6] += value;
        if(index1 + index2 === 2)
            winStack[7] += value;
    }
}

// function checkWinner() {
//     winStack[0] = board[0][0] + board[0][1] + board[0][2];
//     winStack[1] = board[1][0] + board[1][1] + board[1][2];
//     winStack[2] = board[2][0] + board[2][1] + board[2][2];
//     winStack[3] = board[0][0] + board[1][0] + board[2][0];
//     winStack[4] = board[0][1] + board[1][1] + board[2][1];
//     winStack[5] = board[0][2] + board[1][2] + board[2][2];
//     winStack[6] = board[0][0] + board[1][1] + board[2][2];
//     winStack[7] = board[0][2] + board[1][1] + board[2][0];
//     isWin = winStack.some(x => x === 3 || x === -3);
// }

function checkWinner() {
    isWin = winStack.some(x => x === 3 || x === -3);
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
    winStack.forEach((x,i) => winStack[i] = 0);
    board.forEach(x => x.forEach((x, i, arr) => arr[i] = 0));
    messageEl.textContent = "Welcome to Tic-Tac-Toe";
    boardEl.childNodes.forEach(x => x.textContent = "");

    //reset on board staus
    for(let i = 0; i < 9; i++)
        document.getElementById(`${i}`).textContent = winStack[i];
}

function updateStatusTable() {
    for(let i = 0; i < 9; i++)
        document.getElementById(`${i}`).textContent = winStack[i];
}