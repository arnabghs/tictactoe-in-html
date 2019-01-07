let firstPlayerMoves = new Array();
let secondPlayerMoves = new Array();
let playerName, firstPlayer = 'a', secondPlayer;
let firstSymbol = "<img src='icons/shuriken1.png' height = 85px>";
let secondSymbol = "<img src='icons/shuriken2.png' height = 70px>";

const cycler = function (range) {
	let counter = 0;
	return function (list) {
		index = counter++ % range;
		return list[index];
	};
};

const getPlayer = cycler(2);
const getSymbol = cycler(2);
const updateArray = cycler(2);

const winnigCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const isWinningCombination = function (userMoves) {
	return winnigCombination.some(con => con.every(ele => userMoves.includes(ele)));
}

const updateMoveArray = function (index) {
	let arrayToUpdate = updateArray([firstPlayerMoves, secondPlayerMoves]);
	arrayToUpdate.push(index);
}

const hasWon = function () {
	return isWinningCombination(firstPlayerMoves) || isWinningCombination(secondPlayerMoves);
}

const checkWinCondition = function (playerName) {
	if (hasWon()) {
		document.getElementById('message').innerText = `Game won by ${playerName} !`;
		document.getElementById("table").style.pointerEvents = "none";
	}
}

const checkDrawCondition = function () {
	let usedCells = firstPlayerMoves.concat(secondPlayerMoves);
	if (usedCells.length == 9) {
		document.getElementById('message').innerText = "Game is Drawn.";
		document.getElementById("table").style.pointerEvents = "none";
	}
}

const isCellTaken = function (cell) {
	let usedCells = firstPlayerMoves.concat(secondPlayerMoves);
	return usedCells.includes(cell);
}

const showPlayerName = function (playerName) {
	document.getElementById("showPlayerTurn").innerText = `Turn of ${playerName} --> `
}

const placeSymbol = function (index) {
	let symbol = getSymbol([firstSymbol, secondSymbol]);
	document.getElementById(index).innerHTML = symbol;
	updateMoveArray(index);
}

const displayWhichPlayerTurn = function () {
	playerName = getPlayer([secondPlayer, firstPlayer])
	showPlayerName(playerName);
}

const updateBoard = function (index) {
	placeSymbol(index);
	checkWinCondition(playerName);
	checkDrawCondition();
	displayWhichPlayerTurn();
}

const setUnavailableCellMessage = function () {
	document.getElementById('message').innerText = "The cell is already taken, please choose a diffrent cell.";
}

const resetMessage = function () {
	document.getElementById('message').innerText = "";
}

const initiateBoard = function (index) {
	if (isCellTaken(index)) return setUnavailableCellMessage();
	resetMessage();
	updateBoard(index);
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