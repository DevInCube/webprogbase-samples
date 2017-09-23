let express = require('express');
let bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');

let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(busboyBodyParser());  // for files

let user = {
	name: 'User',
	age: 11,
	sex: 'male',
	avaname: null
};

//
// images dictionary
let images = {

};

let sexes = [
	{ value: 'female', title: 'Female' },
	{ value: 'male', title: 'Male' },
	{ value: 'apache', title: 'Apache!' },
]

app.get('/',
	(req, res) => res.render('index', {
		user,
		sexes
	}));

app.post('/user/update', (req, res) => {
	user.name = req.body.name;
	user.age = req.body.age;
	user.sex = req.body.sex;
	 // console.log(req.files);
	if (req.files.ava) {
		let filename = req.files.ava.name;
		images[filename] = req.files.ava;
		user.avaname = filename;
	}
	res.redirect('/');
});

//
// to send images (as bytes)
app.get("/images/:name", (req, res) => {
	res.send(images[req.params.name].data);
});

app.listen(3000, () => console.log("UP!"));
