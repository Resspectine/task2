let rules = ["Rock", "Paper", "Scissors", "Spok", "Lizard", "Java", "Script"];

let pcChoice;
let playerChoice;

function checkIfWin() {
	return playerChoice - pcChoice;
}

function pcTurn() {
	return Math.floor(Math.random() * rules.length);
}

function startGame() {
	let options = '';
	pcChoice = pcTurn();
	document.getElementsByClassName('start')[0].style = 'display: none;';
	document.getElementsByClassName('player-choice')[0].style = 'display: block;';
	rules.forEach((el, id) => {
		options += '<input type="radio" name="answer" id="' + id + '">' +
			'<label for="' + id + '">' + el + '</label>';
	})
	options += '<input type="submit">';
	document.forms[0].innerHTML = options;
}

document.forms[0].addEventListener('submit', function (e) {
	e.preventDefault();
	let inputs = document.forms[0].elements.answer;
	inputs.forEach(el => {
		if (el.checked) playerChoice = el.id;
	})
	let check = checkIfWin();
	if (check == 0) {
		console.log('drawn');
	} else if (check > 0) {
		if (check >= rules.length / 2) {
			console.log('win');
		} else {
			console.log('lose');
		}
	} else if (check < 0) {
		if (check <= -rules.length / 2) {
			console.log('lose');
		} else {
			console.log('win');
		}
	}
	console.log(pcChoice);
});