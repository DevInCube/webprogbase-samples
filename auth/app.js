let db = require('./modules/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let express = require('express');
let app = express();

// setup

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'SEGReT$25_',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//

const serverSalt = "45%sAlT_";

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

//

passport.use(new LocalStrategy(
    function (username, password, done) {
        let hash = sha512(password, serverSalt).passwordHash;
        console.log(username, password);
        db.getUserByLoginAndPasshash(username, hash)
            .then(user => {
                console.log(user);
                done(user ? null : 'No user', user);
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.getUserById(id)
        .then(user => {
            done(user ? null : 'No user', user);
        });
});



// handlers

app.get('/',
    (req, res) => {
        res.render('index', {
            user: req.user
        });
    });

app.get('/register',
    (req, res) => res.render('register', {
        user: req.user
    }));

app.post('/register',
    (req, res) => {
        let user = {
            username: req.body.username,
            passwordHash: sha512(req.body.password, serverSalt).passwordHash,
            role: req.body.username === 'admin' ? 'admin' : 'student'
        };
        db.createUser(user)
            .then(() => {
                res.redirect('/');
            });
    });

app.get('/login',
    (req, res) => res.render('login', {
        user: req.user
    }));

app.get('/logout',
    checkAuth,
    (req, res) => {
        req.logout();
        res.redirect('/');
    });

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

function checkAuth(req, res, next) {
    if (!req.user) return res.sendStatus(401);
    next();
}

app.get('/profile',
    checkAuth,
    async (req, res) => {
        let posts = await db.getPostsByAuthorId(req.user.id);
        res.render('profile', {
            user: req.user,
            posts: posts
        });
    });

function checkAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    next();
}

app.get('/admin',
    checkAuth,
    checkAdmin,
    (req, res) => {
        db.getUsers()
            .then(users => {
                res.render('admin', {
                    user: req.user,
                    users: users
                });
            })
            .catch(() => res.sendStatus(500));
    });

app.post('/posts',
    checkAuth,
    async (req, res) => {
        let post = {
            author_id: req.user.id,
            body: req.body.body
        };
        await db.createPost(post);
        res.redirect('/profile');
    });

app.listen(3000, () => console.log('up!'));