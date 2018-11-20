const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('./passport');

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'K@y!',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send(`
    <form method='POST' action='/login'>
        <input type='text' name='username' value='user'><br/>
        <input type='password' name='password' value='pass'><br/>
        <input type='submit' value='Login'>
    </form>
`));

app.get('/profile',
    (req, res, next) => {
        if (!req.user) { return next(new Error('Not auth')); }
        next();
    },
    (req, res) => {
        res.send(`
    <h1>Profile: ${req.user.username}</h1>
    <button onclick='fetchData()'>Fetch data (session)</button><br/>
    <button onclick='fetchDataBasic()'>Fetch data (basic)</button><br/>
    <script src='/javascripts/browser-app.js'></script>
`);
    });

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res) => res.redirect('/profile'));

app.get('/api/items',
    (req, res, next) => {
        // if there is not session user, try basic
        if (!req.user) { 
            const basicAuthMiddleware = passport.authenticate('basic', { session: false });
            return basicAuthMiddleware(req, res, next); 
        }
        next();
    },
    (req, res) => {
        res.send(`Private data`);
    });

app.use((err, req, res, next) => res.send(err.toString()));

app.listen(3000, () => console.log('started'));