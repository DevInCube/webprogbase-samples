let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();

let db = [
    {
        id: 0,
        name: 'Danylo Kazimirov',
        score: 5.0
    }, {
        id: 1,
        name: 'Anna Korunska <b>(Starosta)</b>',
        score: 95.0
    },
    {
        id:2,
        name: 'Nadiya Chumak',
        score: 95.0
    }
];

const sendFileOpts = {
    root: path.join(__dirname, 'views')
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/',
    async (req, res) => {
        res.sendFile('index.html', sendFileOpts);
    });

app.get('/users', async (req, res) => {
    res.json(db);
})

app.post('/users', async (req, res) => {
    let newUser = {
        id: 100,
        name: req.body.name,
        score: req.body.score
    };
    db.push(newUser);
    res.json(newUser);
});

app.listen(3000, () => console.log(`Up!`));