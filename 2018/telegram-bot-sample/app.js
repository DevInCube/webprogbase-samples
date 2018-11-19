const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const Telegram = require('./modules/telegram');

const app = express();
//
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('mst', mustache());
app.set('views', './views');
app.set('view engine', 'mst');
//

app.get('/', (req, res) => res.render('index'));

app.post('/', async (req, res) => {
    const text = req.body.payload;
    try {
        await Telegram.sendNotification(text);
        console.log('> Event payload:', text);
        res.redirect('/');
    } catch (err) {
        res.send(err.toString());
    }
});

app.listen(3000, () => console.log('Started'));