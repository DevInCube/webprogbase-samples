const mongoose = require('mongoose');

let Film = mongoose.model('Film', {
	title: String,
	year: Number,
	score: Number
});

module.exports = Film;
