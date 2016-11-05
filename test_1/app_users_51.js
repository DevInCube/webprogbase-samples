const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const mongodb = require('promised-mongo');
const crypto = require('crypto');

const app = express();
const url = 'mongodb://localhost:27017/vk51';
const db = mongodb(url);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));

const salt = '%656_das9870';

app.get('/', (req, res) => {
	res.render('users_index');
});

app.get('/users', (req, res) => {
	db.users.find()
		.then(users => {
			res.render('users_users', {
				users: users
			});
		})
		.catch(err => res.status(500).end(err));
});

app.get('/profile', (req, res) => res.render('users_profile'));

app.post('/upload_avatar', (req, res) => {
	let avaFile = req.files.avatar;
	let username = req.body.username;
	let base64String = avaFile.data.toString('base64');
	db.users.findOne({ username: username})
		.then(user => {
			if (user) {
				return db.users.findAndModify({
				    query: { username: username },
				    update: { $set: { avatar: base64String } },
				    new: false
				});
			}
			else {
				res.status(400).end('user not exists');

			}
		})
		.then(() => res.redirect('/users'))
		.catch(err => res.status(500).end(err));
});

app.post('/register', (req, res) => {
	let username = req.body.username;
	let pass = req.body.pass;
	let pass2 = req.body.pass2;
	if (!username || !pass || (pass !== pass2)) res.status(400).end('not ok');
	else {
		db.users.findOne({ username: username})
			.then(user => {
				if (user) res.status(200).end('user exists');
				else {
					return db.users.insert({
						username: username,
						password: crypto.createHash('md5').update(pass + salt).digest("hex")
					});
				}
			})
			.then(() => res.redirect('/profile'))
			.catch(err => res.status(500).end(err));
	}
});

app.listen(3000, () => console.log('App started.'));
