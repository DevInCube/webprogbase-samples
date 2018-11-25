const express = require('express');
const config = require('./config');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const gitHubAppInfo = {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,  // dev "http://127.0.0.1:3000/auth/github/callback" 
}; 

passport.use(new GitHubStrategy(gitHubAppInfo, onGitHubOAuth2Complete));

const app = express();
app.get('/auth/github',
  passport.authenticate('github'));

function onGitHubOAuth2Complete(accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
        { githubId: profile.id }, 
        function (err, user) { cb(err, user); });
}

app.listen(3000, () => console.log(`Started`));