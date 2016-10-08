const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// generic request handler
app.get('/', function (req, res) {
	let data = {
		sitename: 'Sitename',
		text: 'Some text here!'
	};
	res.render('index', data);
});

app.post('/login', (req, res) => {
	let data = {
		login: req.body.login
	};
	res.render('profile', data);
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
