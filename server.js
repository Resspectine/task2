let rules = ["Rock", "Paper", "Scissors", "Spok", "Lizard", "Java", "Script"];

let pcChoice;
let key;
let hash;

function getKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    key = text;
}

function pcTurn() {
    pcChoice = Math.floor(Math.random() * rules.length);
}

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sha1 = require('js-sha1');

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/send', function (req, res) {
    res.end(hex);
})

app.get('/start', function (req, res) {
    pcTurn();
    getKey();
    hash = sha1(pcChoice + key);
    res.json({ rules: rules, hash: hash });
})

app.post('/player/:id', function (req, res) {
    let state;
    let player = req.params.id;
    let check = player - pcChoice;
    if (check == 0) {
        state = 0;
    } else if (check > 0) {
        if (check >= rules.length / 2) {
            state = 1;
        } else {
            state = -1;
        }
    } else if (check < 0) {
        if (check <= -rules.length / 2) {
            state = -1;
        } else {
            state = 1;
        }
    }
    let oldKey = key;
    let oldChoice = pcChoice;
    pcTurn();
    getKey();
    hash = sha1(pcChoice + key);
    res.json({ state: state, key: oldKey, pcChoice: oldChoice, hash: hash });
});