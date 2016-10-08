const express = require('express');
const app = express();
const filmsRouter = require('./routes/films');

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render('index');
});

app.get("/about", (req, res) => {
	res.end("About page");
});

app.use("/films", filmsRouter);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
