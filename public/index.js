let playerChoice = 6;

function startGame() {
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", '/start');
		xhr.onload = () => {
			resolve(JSON.parse(xhr.responseText));
		};
		xhr.send();
	}).then(el => {
		let options = '<p id="hash">' + el.hash + '</p>';
		document.getElementsByClassName('start')[0].style = 'display: none;';
		document.getElementsByClassName('player-choice')[0].style = 'display: block;';
		el.rules.forEach((el, id) => {
			options += '<input type="radio" name="answer" id="' + id + '">' +
				'<label for="' + id + '">' + el + '</label>';
		})
		options += '<input type="submit">';
		document.forms[0].innerHTML = options;
		console.log(el);

	});
}

document.forms[0].addEventListener('submit', function (e) {
	e.preventDefault();
	document.getElementById('oldHash').innerHTML = document.getElementById('hash').innerText;
	new Promise((resolve, reject) => {
		let inputs = document.forms[0].elements.answer;
		inputs.forEach(el => {
			if (el.checked) playerChoice = el.id;
		})
		const xhr = new XMLHttpRequest();
		xhr.open("POST", '/player/' + playerChoice);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = () => {
			resolve(JSON.parse(xhr.responseText));
		};
		xhr.send();
	}).then(el => {
		console.log(el);
		let state;
		if (el.state === 0) { state = 'Drawn'; }
		else if (el.state === -1) { state = 'Lose'; }
		else { state = 'We won zulul'; }
		document.getElementById('hash').innerHTML = el.hash;
		document.getElementById('state').innerHTML = state;
		document.getElementById('key').innerHTML = el.key;
		document.getElementById('choice').innerHTML = el.pcChoice+1;
	});
});