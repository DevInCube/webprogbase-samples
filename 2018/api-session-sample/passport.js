const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;

const defaultUser = {id:1, username: 'Test user'};

passport.serializeUser((user, d) => d(null, user.id));
passport.deserializeUser((id, d) => d(null, defaultUser));

passport.use(new LocalStrategy((username, passport, d) => d(null, defaultUser)));

passport.use(new BasicStrategy((u, p, d) => d(null, user)));