const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const app = express();

const serverSalt = "45%sAlT_";
const db = {
	users : [
		{
			id: 4567224,
			username: "user",
			password: sha512("pass", serverSalt).passwordHash,
			role: "user"
		},
		{
			id: 1214351,
			username: "admin",
			password: sha512("admin", serverSalt).passwordHash,
			role: "admin"
		}
	]
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	let user = db.users.find(x => x.id === id);
	if (!user) done("No user");
	else done(null, user);
});

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'SEGReT$25_',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

function sha512(password, salt){
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

passport.use(new LocalStrategy(
  function(username, password, done) {
	  console.log("Auth %s:%s", username, password);
	  let user = db.users.find(x =>
		  x.username === username &&
	  	  x.password === sha512(password, serverSalt).passwordHash
	  );
	  console.log(user);
	  if (!user) return done(null, false);
	  return done(null, user);
  }
));

app.get('/login', (req, res) => res.render('auth_login'));
app.post('/login',
	passport.authenticate('local', { failureRedirect: '/login' }),
	(req, res) => res.redirect('/'));
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/', (req, res) => res.render('auth_index', { user: req.user }));
app.get('/profile',
	(req, res, next) => {
		if (req.user) next();
		else res.status(401).end('Not authorized');
	},
	(req, res) => res.end('User profile page'));
app.get('/admin',
	(req, res, next) => {
		if (!req.user) res.status(401).end('Not authorized');
		else if (req.user.role !== 'admin') res.status(403).end('Forbidden');
		else next();
	},
	(req, res) => res.end('Admin page'));

app.listen(3000, () => console.log('App started'));
