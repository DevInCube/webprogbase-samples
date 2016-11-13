const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const mongodb = require('promised-mongo');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const url = 'mongodb://localhost:27017/vk52';
const db = mongodb(url);

let sessionSecret = "jahdgalsdg^&(*&^%  _Asds)";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));
app.use(cookieParser());
app.use(session({
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	console.log("deserializeUser id: " + id);
	db.users.findOne({ _id: mongodb.ObjectId(id) })
		.then(user => {
			if(user) {
				done(null, user);
			} else {
				done("No user", null);
			}
		})
		.catch(err => done(err, null));
});
passport.use(new LocalStrategy((username, password, done) => {
	  console.log("Local: " + username + " : " + password);
	  db.users.findOne({
			  username: username,
			  passwordHash: hash(password)
		  })
		  	.then(user => {
				console.log(user);
				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			})
			.catch(err => {
				console.log(err);
				done(err, null);
			});
}));

const salt = 'sid_fhKJG-=-*&8734';
function hash(pass) {
	return crypto.createHash('md5').update(pass + salt).digest("hex");
}

app.get('/',
	(req, res) => res.render('users_index', { user: req.user }));

app.get('/register-error', (req, res) => res.end("Register error"));

app.get('/login', (req, res) => res.render("users_login"));
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});
app.post('/login',
	passport.authenticate('local', { failureRedirect: '/' }),
	(req, res) => res.redirect('/'));

app.post('/upload_avatar',
	(req, res) => {
		let avaObj = req.files.avatar;
		let username = req.user.username;
		let base64String = avaObj.data.toString('base64');
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
			.then(() => res.redirect('/'))
			.catch(err => res.status(500).end(err));
	});

app.post('/register',
	(req, res) => {
		let username = req.body.username;
		let pass = req.body.pass;
		let pass2 = req.body.pass2;
		console.log(username);
		if (!username || !pass || pass !== pass2) {
			res.redirect('/register-error');
		}
		db.users.findOne({ username: username})
			.then(x => {
				if (x) {
					res.end("Such username exists " + JSON.stringify(x));
				} else {
					db.users.insert({
						username: username,
						passwordHash: hash(pass)
					})
						.then(() => res.redirect('/login'))
						.catch(err => res.status(500).end(err));
				}
			})
			.catch(err => res.status(500).end(err));


	});

app.get('/users', (req, res)=> db.users.find().then(users => res.json(users)));

app.listen(3000, () => console.log('App on 3000'));
