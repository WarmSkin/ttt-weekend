/*-------------------------------- Constants --------------------------------*/
const gameStack = {
    sq0: undefined,
    sq1: undefined,
    sq2: undefined,
    sq3: undefined,
    sq4: undefined,
    sq5: undefined,
    sq6: undefined,
    sq7: undefined,
    sq8: undefined,
}


/*---------------------------- Variables (state) ----------------------------*/
let player1Move = true;


/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".board").addEventListener('click', playerMove);


/*-------------------------------- Functions --------------------------------*/

function playerMove(e){
    e.target.textContent = 
}