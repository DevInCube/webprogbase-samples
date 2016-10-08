const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// generic request handler
app.get('/', function (req, res) {
	let data = {
		sitename: 'Sitename',
		text: 'Some text here!'
	};
	res.render('index', data);
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
