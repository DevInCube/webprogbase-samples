const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const sessionSecret = 'SEGReT$25_';
const serverSalt = "45%sAlT_";

function hash(pass) {
	return crypto.createHash('md5').update(pass + serverSalt).digest("hex");
}

const db = {
	users : [ {
			id: 4567224,
			username: "user",
			password: hash("pass")
	}, {
			id: 4567245,
			username: "user2",
			password: hash("pass")
	} ],
	messages: [{
		author: 'user',
		text: 'Sample message'
	}]
};

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	let user = db.users.find(x => x.id === id);
	if (!user) done("No user");
	else done(null, user);
});
passport.use(new LocalStrategy((username, password, done) => {
	  let user = db.users.find(x =>
		  x.username === username &&
	  	  x.password === hash(password)
	  );
	  console.log(user);
	  if (!user) return done(null, false);
	  return done(null, user);
}));

app.get('/',
	(req, res) => res.render('csrf_index', {
		user: req.user,
		messages: db.messages
	}));
app.post('/login',
	passport.authenticate('local', { failureRedirect: '/' }),
	(req, res) => res.redirect('/'));
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.post('/add_message', (req, res) => {
	if (!req.user) res.status(401).end('Not authorized');
	else {
		let message = {
			author: req.user.username,
			text: req.body.message
		};
		db.messages.push(message);
		res.redirect('/');
	}
});

app.listen(3000, () => console.log('App started at 3000'));
