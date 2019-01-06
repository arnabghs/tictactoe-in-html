let firstPlayerMoves = new Array();
let secondPlayerMoves = new Array();
let firstPlayer, secondPlayer = '';
let turnCount = 1;

const isEven = function (number) {
	return number % 2 == 0;
}

const winnigCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const isSubset = function (userMoves) {
	return winnigCombination.some(con => con.every(ele => userMoves.includes(ele)));
}

const updateMoveArray = function (index) {
	let arrayToUpdate = firstPlayerMoves;
	if (isEven(turnCount)) arrayToUpdate = secondPlayerMoves;
	arrayToUpdate.push(index);
}

const checkWinCondition = function () {
	if (isSubset(firstPlayerMoves)) {
		document.getElementById('message').innerText = `Game won by ${firstPlayer} !`;
		document.getElementById("table").style.pointerEvents = "none";
	}
	if (isSubset(secondPlayerMoves)) {
		document.getElementById('message').innerText = `Game won by ${secondPlayer} !`;
		document.getElementById("table").style.pointerEvents = "none";
	}
}

const isCellTaken = function (cell) {
	let usedCells = firstPlayerMoves.concat(secondPlayerMoves);
	return usedCells.includes(cell);
}

const initiateBoard = function (event) {
	let index = +event.target.id;
	let symbol = isEven(turnCount) ? 'O' : 'X';
	let playerName = isEven(turnCount) ? firstPlayer : secondPlayer;
	document.getElementById('message').innerText = "";
	if (isCellTaken(index)) {
		document.getElementById('message').innerText = "The cell is already taken, please choose a diffrent cell.";
	} else {
		if (turnCount > 9) {
			document.getElementById('message').innerText = "Game is Drawn.";
			document.getElementById("table").style.pointerEvents = "none";
		}
		showPlayerName(playerName);
		document.getElementById(index).innerText = symbol;
		updateMoveArray(index);
		checkWinCondition();
		turnCount++;
	}
}

const showPlayerName = function (playerName) {
	document.getElementById("showPlayerTurn").innerText = `Turn of ${playerName} --> `

}

const startGame = function () {
	firstPlayer = document.getElementById('player1').value;
	secondPlayer = document.getElementById('player2').value;
	document.getElementById("table").style.pointerEvents = "auto";
	document.getElementById("table").style.backgroundColor = " lightgreen";
	showPlayerName(firstPlayer);
}

const loadPage = function () {
	document.getElementById("table").style.pointerEvents = "none";
}