let express = require('express');

let db = require('./modules/database');

let app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'sdfjhsdfkdjshfgds$25_',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.getUserById(id)
        .then(user => {
            if (!user) done("No user");
            else done(null, user);
        });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        let passwordHash = sha512(password, serverSalt).passwordHash;
        db.getUserByLoginAndPass(username, passwordHash)
            .then(user => {
                if (!user) return done("No user", false);
                return done(null, user);
            });
    }
));


app.set('view engine', 'ejs');

app.get('/',
    (req, res) => res.render('index', {
        user: req.user
    }));

app.get('/logout',
    (req, res) => {
        req.logout();
        res.redirect('/login');
    });

app.get('/profile',
    checkAuth,
    async (req, res) => {
        let user = req.user;
        try {
            let posts = await db.getPostsByAuthorId(user.id);
            res.render('profile', {
                user,
                posts
            });
        } catch (e) {
            res.sendStatus(500);
        }
    });

function checkAdmin(req, res, next) {
    if (!req.user) return res.sendStatus(401);
    if (req.user.role !== 'admin') return res.sendStatus(403);
    next();
}

function checkAuth(req, res, next) {
    if (!req.user) return res.sendStatus(401);
    next();
}

app.get('/admin',
    checkAdmin,
    (req, res) => res.render('admin', {
        user: req.user
    }));

app.get('/register',
    (req, res) => res.render('register', {
        user: req.user
    }));

const serverSalt = "4aauskdkasdjh5%sAlT_";

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

app.post('/register',
    async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let passwordHash = sha512(password, serverSalt).passwordHash;
        let user = {
            username,
            passwordHash,
            role: "user"
        };
        try {
            await db.createUser(user);
            res.redirect('/login');
        } catch (e) {
            res.sendStatus(500);
        }
    });

app.get('/login',
    (req, res) => res.render('login', {
        user: req.user
    }));

app.post('/login',
    passport.authenticate('local'),
    (req, res) => res.redirect('/profile'));

app.post('/posts',
    checkAuth,
    async (req, res) => {
        let author_id = req.user.id;
        let body = req.body.body;
        try {
            await db.createPost({
                body,
                author_id
            });
            res.redirect('/profile');
        } catch (e) {
            res.sendStatus(500);
        }
    });

app.listen(3000, () => console.log('UP!'));