const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
//
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('mst', mustache());
app.set('views', './views');
app.set('view engine', 'mst');
//

app.get('/', (req, res) => res.render('index'));

app.post('/', (req, res) => {
    // @todo gen event here
    console.log('> Event payload:', req.body.payload);
    res.redirect('/');
});

app.listen(3000, () => console.log('Started'));