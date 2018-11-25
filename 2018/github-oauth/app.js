const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const User = require('./user');
const config = require('./config');

const gitHubAppInfo = {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,  // dev "http://127.0.0.1:3000/auth/github/callback" 
};

passport.serializeUser((user, cb) => cb(null, user.githubId));
passport.deserializeUser((githubId, cb) => User.getByGitHubId(githubId, cb));

passport.use(new GitHubStrategy(gitHubAppInfo, onGitHubOAuth2Complete));

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: config.sessionSecret,
    resave: true, 
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send(`
    <p>${req.user && `User github id: ${req.user.githubId}` || 'Not logged in'}</p>
    <a href='/auth/github'>Login via GitHub</a>
`));

app.get('/auth/github',
    passport.authenticate('github'));
app.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/?failed',
        successRedirect: '/?success'
    }));

function onGitHubOAuth2Complete(accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
        { githubId: profile.id },
        (err, user) => cb(err, user));
}

app.listen(3000, () => console.log(`Started`));