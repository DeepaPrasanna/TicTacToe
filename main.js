const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const dataWnningMessageElement = document.querySelector('[data-winning-message-text]')
const WinningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')

const CIRCLE_CLASS = "circle"
const X_CLASS = "x"
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {

    circleTurn = false;

    cellElements.forEach(cell => {
        //first remove all the added class and the event listeners if the game is restarted
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)

        //only for each click,"handleClick ()" is called
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()

    WinningMessage.classList.remove('show');

}

function handleClick(e) {
    // console.log("clicked")
    const cell = e.target
    // console.log(cell)
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    //placing the mark
    placeMark(cell, currentClass)
    //checking for winning status
    if (checkWin(currentClass)) {
        // console.log("winner")
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        //swapping the turns
        swapTurns()
        //hover effect
        setBoardHoverClass()

    }


}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        dataWnningMessageElement.innerText = "Draw!"
    }
    else {
        dataWnningMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    WinningMessage.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}



function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

