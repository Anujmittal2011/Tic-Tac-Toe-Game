// window.addEventListener('load',bindevent);

// var buttons;

// function bindevent(){
//      buttons = document.getElementsByTagName('button');
//     //  console.log(buttons);

// for(var i = 0; i<buttons.length; i++){
//     var currentbutton = buttons[i];
//     currentbutton.addEventListener('click',printxorzero);
//     }
// }

// function isnotblank(currentbutton){
//     return currentbutton.innerText.trim().length>0
// }

// function isthreesame(first,second,third){
//     if(isnotblank(first) && isnotblank(second) && isnotblank(third)){
//         return first.innerText == second.innerText && first.innerText == third.innerText;
//     }
//     else{
//         return false;
//     }
// }

// function isgameover(){
//      return isthreesame(buttons[0],buttons[1],buttons[2])
//     ||  isthreesame(buttons[0],buttons[3],buttons[6])
//     ||  isthreesame(buttons[3],buttons[4],buttons[5])
//     ||  isthreesame(buttons[6],buttons[7],buttons[8])
//     ||  isthreesame(buttons[1],buttons[4],buttons[7])
//     ||  isthreesame(buttons[2],buttons[5],buttons[8])
//     ||  isthreesame(buttons[0],buttons[4],buttons[8])
//     ||  isthreesame(buttons[2],buttons[4],buttons[6])
// }

// function reset(){
//     clearInterval(interval); //to stop interval after 5 sec
//     blocked = false;
//     count = 0;
//     flag =  true;
//     countdownvalue = 5;
//     for(var i = 0; i<buttons.length; i++){
//         buttons[i].innerText = '';
//     }
//     document.getElementById('output').innerText = '';
// }

// var countdownvalue = 5;
// var interval;
// function countdown(){
//     interval = setInterval(function() {
//         countdownvalue--;
//         document.getElementById('Output').innerText = `Game Over and Reset After ${countdownvalue} sec`;
//     }, 1000);
// }

// function resetafter5sec(){
//     countdown();
//     // clearInterval(interval); //to stop interval aftr 5 sec
//     setTimeout(function(){
//         reset();
//     },5000);
//     console.log("Doing something else");
//     //new thread open for set time and main thread continues
// }

// var flag = true;
// var count = 0;
// var blocked = false;
// function printxorzero(){
//     if(!blocked && this.innerText.trim().length==0){
//         count++;

//         var buttonvalue = flag?"X":"0";
//         this.innerText = buttonvalue;
//         flag = !flag;

        
//         if (count >= 5){
//             if(isgameover()){
//                 blocked = true;
//                 document.getElementById('Output').innerText = `Player ${buttonvalue} wins! 
//                 Game Over and Reset After 5 sec`;
//                 resetafter5sec();
//                 //  alert("Game Over and Reset after 5 second")
//             }
//         }
//     }
// } 

// //maintain a count, to check id count goes 
// //>4 then check game over condition
// // if(count>4){
// //     function isgameover(){

//         // game over conditions
//         // 1. row values are same
//         // 2. col values are same 
//         // 3. diagonal values are same
//     // }
//     // }





'use strict'

const statusDisplay = document.getElementById('status')
const countField = document.getElementById('numberTurns')
const startBox = document.getElementById('startBox')
const playField = document.getElementById('field')
const player1_name = document.getElementById('player1_name')
const player2_name = document.getElementById('player2_name')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')

let gameActive = true
let currentPlayer = 'X'
let gameState = []
let cols, rows, steps, counter = 0

const winnMessage = () => `${currentPlayer} has won!`
const nobodyWinsMessage = () => `it's a draw!`

// ----------------------------------  START GAME
let checkInput = (input) => {
    input = +input
    input = (input < 3)
        ? 3
        : (input > 10)
            ? 10
            : input
    return input
}
let createMatrix = () => {
    let arr
    for (let i = 0; i < rows; i++) {
        arr = []
        for (let j = 0; j < cols; j++) {
            arr[j] = 0
        }
        gameState[i] = arr
    }
    console.log(gameState)
}
let drawField = () => {
    let cellSize = window.innerHeight * 0.5 / cols
    let box = document.createElement('div')
    box.setAttribute('id', 'container')

    let cell, row
    for (let i = 0; i < rows; i++) {
        row = document.createElement('div')
        row.className = 'row'
        for (let j = 0; j < cols; j++) {
            cell = document.createElement('div')
            cell.setAttribute('id', `${i}_${j}`)
            cell.className = 'cell'
            cell.style.width =
                cell.style.height =
                    cell.style.lineHeight = `${cellSize}px`
            cell.style.fontSize = `${cellSize / 16}em`
            row.appendChild(cell)
        }
        box.appendChild(row)
    }
    playField.appendChild(box)
}

let handleStart = () => {
    player1.innerHTML = player1_name.value === '' ? 'Player \'X\'' : player1_name.value
    player2.innerHTML = player2_name.value === '' ? 'Player \'O\'' : player2_name.value
    cols = checkInput(document.getElementById('columns').value)
    rows = checkInput(document.getElementById('rows').value)
    steps = checkInput(document.getElementById('steps').value)
    createMatrix()
    drawField()
    startBox.className = 'hidden'
    handlePlayerSwitch()
    document.querySelectorAll('.cell')
        .forEach(cell => cell.addEventListener('click', handleClick))
}

// ---------------------------------- WINNER ALGORITHM

let isWinning = (y, x) => {
    let winner = currentPlayer === 'X' ? 1 : 2,
        length = steps * 2 - 1,
        radius = steps - 1,
        countWinnMoves, winnCoordinates

    // horizontal
    countWinnMoves = 0
    winnCoordinates = []
    for (let i = y, j = x - radius, k = 0; k < length; k++, j++) {
        if (i >= 0 && i < rows && j >= 0 && j < cols &&
            gameState[i][j] === winner && gameActive) {
            winnCoordinates[countWinnMoves++] = [i, j]
            if (countWinnMoves === steps) {
                winnActions(winnCoordinates)
                return
            }
        } else {
            countWinnMoves = 0
            winnCoordinates = []
        }
    }

    // vertical
    countWinnMoves = 0
    winnCoordinates = []
    for (let i = y - radius, j = x, k = 0; k < length; k++, i++) {
        if (i >= 0 && i < rows && j >= 0 && j < cols &&
            gameState[i][j] === winner && gameActive) {
            winnCoordinates[countWinnMoves++] = [i, j]
            if (countWinnMoves === steps) {
                winnActions(winnCoordinates)
                return
            }
        } else {
            countWinnMoves = 0
            winnCoordinates = []
        }
    }

    // oblique to the right
    countWinnMoves = 0
    winnCoordinates = []
    for (let i = y - radius, j = x - radius, k = 0; k < length; k++, i++, j++) {
        if (i >= 0 && i < rows && j >= 0 && j < cols &&
            gameState[i][j] === winner && gameActive) {
            winnCoordinates[countWinnMoves++] = [i, j]
            if (countWinnMoves === steps) {
                winnActions(winnCoordinates)
                return
            }
        } else {
            countWinnMoves = 0
            winnCoordinates = []
        }
    }

    // oblique to the left
    countWinnMoves = 0
    winnCoordinates = []
    for (let i = y - radius, j = x + radius, k = 0; k < length; k++, i++, j--) {
        if (i >= 0 && i < rows && j >= 0 && j < cols &&
            gameState[i][j] === winner && gameActive) {
            winnCoordinates[countWinnMoves++] = [i, j]
            if (countWinnMoves === steps) {
                winnActions(winnCoordinates)
                return
            }
        } else {
            countWinnMoves = 0
            winnCoordinates = []
        }
    }
}

// ----------------------------------  GAME ONGOING

let handlePlayerSwitch = () => {
    if (currentPlayer === 'X') {
        player1.style.background = '#8458B3'
        player2.style.background = '#d0bdf4'
    } else {
        player1.style.background = '#d0bdf4'
        player2.style.background = '#8458B3'
    }
}

let isMovesLeft = () => {
    if (counter === cols * rows) {
        statusDisplay.innerHTML = nobodyWinsMessage()
        gameActive = false
    }
}

let handleClick = (event) => {
    let clickedIndex = event.target.getAttribute('id').split('_');
    let i = +clickedIndex[0]
    let j = +clickedIndex[1]

    if (gameState[i][j] !== 0 || !gameActive)
        return

    gameState[i][j] = (currentPlayer === 'X') ? 1 : 2
    event.target.innerHTML = currentPlayer
    countField.innerHTML = `${++counter}`

    isWinning(i, j)
    isMovesLeft()
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    handlePlayerSwitch()

    // console.log(gameState)
}

// ----------------------------------  SHOW WINNING RESULTS

function winnActions(winner) {
    console.log(winner)

    gameActive = false
    statusDisplay.innerHTML = winnMessage()
    statusDisplay.style.color = '#139de2'

    let cell
    for (let i = 0; i < winner.length; i++) {
        cell = document.getElementById(`${winner[i][0]}_${winner[i][1]}`)
        cell.style.color = '#139de2'
    }
}

// ----------------------------------  RESET GAME
let handlePlayAgain = () => {
    gameActive = true
    currentPlayer = 'X'
    counter = 0
    countField.innerHTML = '0'
    statusDisplay.innerHTML = ''
    statusDisplay.style.color = 'black'
    player1.style.background = player2.style.background = '#d0bdf4'
    playField.removeChild(document.getElementById('container'))
    handleStart()
}

let handleRestart = () => {
    gameActive = true
    currentPlayer = 'X'
    counter = 0
    countField.innerHTML = '0'
    statusDisplay.innerHTML = ''
    statusDisplay.style.color = 'black'
    player1.style.background = player2.style.background = '#d0bdf4'
    player1_name.value = player2_name.value = ''
    player1.innerHTML = player2.innerHTML = '-'
    startBox.className = 'sidebar'
    playField.removeChild(document.getElementById('container'))
}

document.querySelector('#start').addEventListener('click', handleStart)
document.querySelector('#playAgain').addEventListener('click', handlePlayAgain)
document.querySelector('#restart').addEventListener('click', handleRestart)


