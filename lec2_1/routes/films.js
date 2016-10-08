const express = require('express');

let films = [
	{
		title: 'Forest Gump',
		year: "1994"
	},
	{
		title: 'Inception',
		year: "2011"
	}
];

const filmsRouter = express.Router();
filmsRouter.get('/', function(req, res){
	res.render('films', { films: films });
});

filmsRouter.get('/:index', function(req, res){
	let index = req.params.index;
	if (index >= 0 && index < films.length) {
		res.render('filmTemplate', films[index]);
	} else {
		res.status(404).end("Not found!");
	}
});

filmsRouter.post("/", (req, res) => {
	let newObj = req.body;
	films.push(newObj);
	res.json(newObj);
});

filmsRouter.delete("/:index", (req, res) => {
	let index = req.params.index;
	if (index >= 0 && index < films.length) {
		films.splice(index, 1);
		res.end("Deleted");
	} else {
		res.status(404).end("Not found!");
	}
});

module.exports = filmsRouter;
