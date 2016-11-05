const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/',
	(req, res) => res.render('csrf_evil_index'));

app.listen(3001, () => console.log('Evil app started at 3001'));
