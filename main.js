const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restartbtn");
const winConditions =[ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    ];
let options = ["","","","","","","","",""];
let currentplayer = "X";
let running = false;
initializeGame();


function initializeGame(){
    cells.forEach(cell =>cell.addEventListener("click",cellClicked));
    restart.addEventListener("click",restartGame);
    statusText.textContent = `${currentplayer}'s turn`;
    running = true;



}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] !=""|| !running){
        return;
    }
    updateCell(this,cellIndex);
    checkwinner();

}
function updateCell(cell,index){
    options[index] = currentplayer;
    cell.textContent = currentplayer;

}
function changeplayer(){

    currentplayer = (currentplayer ==="X") ? "O":"X";
    statusText.textContent =`${currentplayer}'s turn`;
}
function checkwinner(){
    let roundWon = false;
     for (let i = 0;i< winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        
        if (cellA ==""|| cellB =="" || cellC ==""){
            continue;
        }
        if(cellA ==cellB && cellB ==cellC){
          roundWon = true;
          break;  
        }


     }
     if (roundWon){
        statusText.textContent = `${currentplayer} wins!`;
        running = false;

     }
     else if(!options.includes("")){
        statusText.textContent =`Draw!`;
        running = false;
     }
     else{
        changeplayer();
     }

}
function restartGame(){
    currentplayer = "X";
    let options = ["","","","","","","","",""];
    statusText,textContent = ` ${currentplayer}'s turn`;
    cells.forEach(cell => cell.textContent ="");
    running = true;

}
