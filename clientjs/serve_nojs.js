const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

let db = {
	users: [
		{
			id: 1,
			fullname: 'Taras Sheva'
		},
		{
			id: 2,
			fullname: 'Some Dude'
		},
		{
			id: 3,
			fullname: 'Taras Shevchenko'
		},
		{
			id: 4,
			fullname: 'Inna Baa'
		},
		{
			id: 5,
			fullname: 'Taras Taras'
		},
		{
			id: 6,
			fullname: 'Sash Kaa'
		}
	]
};

app.get('/', (req, res) => {
	let nameFilter = req.query.nameFilter || "";
	let filterText = nameFilter.toLowerCase().trim();
	let filteredUsers = db.users;
	if (filterText) {
		filteredUsers = db.users.filter(x => x.fullname.toLowerCase().includes(filterText));
	}
	let templateData = {
		users: filteredUsers,
		nameFilter: nameFilter
	};
	res.render('items_nojs', templateData);
});

app.post('/users/:id(\\d+)/remove', (req, res) => {
	let nameFilter = req.query.nameFilter || "";
	let userIndex = db.users.findIndex(x => x.id == req.params.id);
	if (userIndex < 0) {
		res.status(404).end('Error');
	} else {
		db.users.splice(userIndex, 1);
		res.redirect('/?nameFilter=' + nameFilter);
	}
});

app.post('/users', (req, res) => {
	let nameFilter = req.body.nameFilter || "";
	let newUserName = req.body.newUserName;
	if (!newUserName) {
		res.status(400).end('Error');  // bad request
	} else {
		let newUser = {
			id: 100 + (Math.random() * 100000) | 0,
			fullname : newUserName
		};
		db.users.push(newUser);
		res.redirect('/?nameFilter=' + nameFilter);
	}
});

app.listen(3000, () => console.log('Server is listening.'));

