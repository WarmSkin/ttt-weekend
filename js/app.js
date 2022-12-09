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
let player1Move = true, isWin = false;
let index1, index2;


/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".board").addEventListener('click', play);


/*-------------------------------- Functions --------------------------------*/

function play(e) {
    playerMove(e);
    checkWinner();
    render();
}

function playerMove(e){
    let id = e.target.id;
    index1 = +id[0];
    index2 = +id[1];
    if(!board[index1][index2]){
        //update html block
        e.target.textContent = player1Move ? "X" : "O";
        //update board data
        board[index1][index2] = player1Move ? 1 : -1;

        //updata winStack data -- yeah, all about math here.
        let value = player1Move ? 1 : -1;
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
        document.getElementById("message").textContent = 
        (`The Winner is ${player1Move ? "Player1" : "Player2"} !`)
    }
    player1Move = !player1Move;
}
