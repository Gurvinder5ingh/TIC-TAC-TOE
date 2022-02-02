const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [

[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

const cellElement = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMesageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleturn

gameStart()

restartButton.addEventListener('click', gameStart)

function gameStart() {
	circleturn = false
	cellElement.forEach(cell => {
		cell.classList.remove(X_CLASS)
		cell.classList.remove(CIRCLE_CLASS)
		cell.removeEventListener('click', handleClick)
	cell.addEventListener('click', handleClick, {once: true})
})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function endGame(draw) {
	if (draw) {
		winningMesageTextElement.innerText = "Draw"

	}else {
		winningMesageTextElement.innerText = `${circleturn ? "O's" : "X's"} Wins!`

	}
	winningMessageElement.classList.add("show")
}

function handleClick(e) {
	const cell = e.target
	const currentClass = circleturn ? CIRCLE_CLASS: X_CLASS
	placeMark(cell, currentClass)
	// check for win
	if(checkWin(currentClass)) {
		endGame(false)

	}else if (isDraw()){
		endGame(true)

	}else {
		swapTurns()
		setBoardHoverClass()
	}
	
}

function isDraw() {
	return [...cellElement].every(cell =>{
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)

}

function swapTurns() {
	circleturn = !circleturn
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS)
	board.classList.remove(CIRCLE_CLASS)
	if (circleturn) {
		board.classList.add(CIRCLE_CLASS)

	}else {
		board.classList.add(X_CLASS)
	}
}


function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElement[index].classList.contains(currentClass)
		})
	})
}	