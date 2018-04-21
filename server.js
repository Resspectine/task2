let rules;
let pcChoice;
let key;
let hash;

function getKey() {
    key = secureRandom(30, { type: 'Buffer' }).toString('hex');
}

function pcTurn() {
    pcChoice = Math.floor(Math.random() * rules.length);
}

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sha1 = require('js-sha1');
let fs = require('fs');
let { SHA384 } = require('sha2');
let secureRandom = require('secure-random');
let createHmac = require('create-hmac')

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/send', function (req, res) {
    res.end(hex);
})

app.get('/start', function (req, res) {
    new Promise(function (res, req) {
        fs.readFile('./public/config.txt', function (err, data) {
            rules = (data.toString()).split(' ');
            res(rules);
        });
    }).then((el) => {
        pcTurn();
        getKey();
        let hmac = createHmac('sha384', Buffer.from(key));
        hmac.update(rules[pcChoice]);
        hash = hmac.digest().toString('hex');
        res.json({ rules: rules, hash: hash });
    });
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
    let hmac = createHmac('sha384', Buffer.from(key));
    hmac.update(rules[pcChoice]);
    hash = hmac.digest().toString('hex');
    res.json({ state: state, key: oldKey, pcChoice: rules[oldChoice], hash: hash });
});