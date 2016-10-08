const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));

// generic request handler
app.get('/', function (req, res) {
	let data = {
		sitename: 'Sitename',
		text: 'Some text here!'
	};
	res.render('index', data);
});

app.post('/upload', (req, res) => {
	let avaFile = req.files.avatar;
	console.log(avaFile);
	let base64String = avaFile.data.toString('base64');
	console.log(base64String);
	let data = {
		image: base64String
	};
	res.render('fileview', data);
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
