const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const Winconditions = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [3,6,9,12],
    [0,5,10,15]];
let options = ["","","","","","","","","","","","","","","",""];
let currentPlayer = "X";
let running = false;


InitializeGame();

function InitializeGame(){
    cell.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    console.log(cellIndex);

    if(options[cellIndex] != "" || !running)
    {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O": "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0;i<Winconditions.length;i++)
    {
        const conditions = Winconditions[i];
        const cell1 = options[conditions[0]];
        const cell2 = options[conditions[1]];
        const cell3 = options[conditions[2]];
        const cell4 = options[conditions[3]];

        if(cell1 == ""||cell2 == ""|| cell3 == "" || cell4 == ""){
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3 && cell3 == cell4){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    }
    else if(!options.includes(""))
        {
            statusText.textContent = `It's a Draw!`;
             running = false;
        }
    else {
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cell.forEach(cell => cell.textContent = "");
    running = true;

}