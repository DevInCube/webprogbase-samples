const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

let Film = mongoose.model('Film', {
	title: String,
	year: Number,
	score: Number
});

mongoose.connect('mongodb://localhost:27017/filmdb');

Film.find().exec()
	.then(films => {
		if (!films || films.length === 0) {
			let film = new Film({
				title: 'First film',
				year: 2016,
				score: 4.5
			});
			return film.save();
		} else {
			return null;
		}
	})
	.then((x) => {
		if (x) {
			console.log('Initial data saved');
		}
	})
	.catch(err => console.log(`Failed to init db: ${err}`));

function getAllFilms() {
	return Film.find().exec();
}

app.get('/', (req, res) => res.end('index'));
app.get('/fill', 
	(req, res) => {
		Promise.all([
			new Film({
				title: 'Second film',
				year: 2016,
				score: 3
			}).save(),
			new Film({
				title: 'Third film',
				year: 2015,
				score: 4.5
			}).save()
		]).then(x => res.redirect('/films'));
	});
app.get('/films', (req, res) => {
	// @todo get url arguments and filter result list
	getAllFilms()
		.then(films => res.json(films));
});
app.get('/films/filter', (req, res) => {
	// @todo get url arguments and filter result list
	let score = null;
	let fnd = {};
	console.log(fnd);
	Film.find(fnd).exec()
		.then(films => res.json(films));
});

const WEB_PORT = 3000;
app.listen(3000, () => console.log('App on 3000'));
