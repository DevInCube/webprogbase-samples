const express = require('express');
const router = express.Router();

let films = [
	{
		title: 'Forect Gump',
		year: 1992
	},
	{
		title: "Inception",
		year: 2011
	}
];

router.get("/", (req, res) => {
	let data = {
		films: films
	};
	res.render('films', data);
});

router.get("/json", (req, res) => {
	res.json(films);
});

router.get("/:index", (req, res) => {
	let index = req.params.index;
	if (index >=0 && index < films.length) {
		let film = films[index];
		let data = {
			title: film.title,
			year: film.year,
			index: index
		};
		res.render('film', data);
	} else {
		res.status(404).end(`No film with index ${index} found`);
	}
});

router.get("/:index/json", (req, res) => {
	let index = req.params.index;
	if (index >=0 && index < films.length) {
		res.json(films[index]);
	} else {
		res.status(404).end(`No film with index ${index} found`);
	}
});

module.exports = router;
