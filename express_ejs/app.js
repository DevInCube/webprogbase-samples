let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// let usersRouter = require('./routes/users');
// app.use('/users', usersRouter);

app.get('/', 
	(req, res) => res.render('index'));
app.post('/', (req, res) => {
	let name = req.body.name;
	res.json({name});
});

app.use((req, res) => {
	res.send('hello');
});

app.listen(3000, () => console.log("UP!"));
