const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));

app.get('/',
	(req, res) => res.render('app_fs'));

app.post('/upload',
	(req, res) => {
		let fileObject = req.files.file;
		let fileName = fileObject.name;
		let enc = fileObject.encoding;
		let fileBytes = fileObject.data;
		
		let wstream = fs.createWriteStream(fileName);
		wstream.on('finish', function () {
			res.redirect('/');
		});
		wstream.write(fileBytes);
		wstream.end();
	});
	
app.listen(3000, () => console.log('App on 3000'));
