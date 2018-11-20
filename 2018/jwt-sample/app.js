const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));

require('./modules/passport');

const fileOptions = { root: path.join(__dirname, './views') };
app.get("/", (req, res) => res.sendFile('index.html', fileOptions));

const authRouter = require('./routes/auth');
app.use("/auth", authRouter);

const passport = require("passport");
app.get("/api/items-private", 
    passport.authenticate('jwt', {session: false}), 
    (req, res) => res.send({user: req.user, message: "Private data"}));

app.listen(3000, () => console.log('Started'));