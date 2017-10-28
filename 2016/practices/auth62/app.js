let express = require('express');

let app = express();

app.set('view engine', 'ejs');

app.get('/',
    (req, res) => res.render('index'));

app.get('/profile',
    (req, res) => res.render('profile'));


app.get('/admin',
    (req, res) => res.render('admin'));

app.listen(3000, () => console.log('UP!'));