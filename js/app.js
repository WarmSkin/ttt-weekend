/*-------------------------------- Constants --------------------------------*/
const board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
/*---------------------------- Variables (state) ----------------------------*/
let player1Move = true;
let isWin = false;
let index1, index2;
const winStack = [0,0,0,0,0,0,0,0];


/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".board").addEventListener('click', play);


/*-------------------------------- Functions --------------------------------*/

function play(e) {
    playerMove(e);
    checkWinner();
    checkWinner();
    render();
}

function playerMove(e){
    let id = e.target.id;
    index1 = id[0];
    index2 = id[1];
    if(!board[index1][index2]){
        e.target.textContent = player1Move ? "X" : "O";
        board[index1][index2] = player1Move ? 1 : -1;
        player1Move = !player1Move;
    }
}

function checkWinner() {
    winStack[0] = board[0][0] + board[0][1] + board[0][2];
    winStack[1] = board[1][0] + board[1][1] + board[1][2];
    winStack[2] = board[2][0] + board[2][1] + board[2][2];
    winStack[3] = board[0][0] + board[1][0] + board[2][0];
    winStack[4] = board[0][1] + board[1][1] + board[2][1];
    winStack[5] = board[0][2] + board[1][2] + board[2][2];
    winStack[6] = board[0][0] + board[1][1] + board[2][2];
    winStack[7] = board[0][2] + board[1][1] + board[2][0];
    isWin = winStack.some(x => x === 3 || x === -3);
}

function render() {
    if(isWin)
        document.getElementById("message").textContent = 
        (`The Winner is ${player1Move ? "Player2" : "Player1"} !`
        )
}
