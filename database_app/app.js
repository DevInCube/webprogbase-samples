const express = require('express');
const mongoose = require('mongoose');

// SOAP Service
const fs = require('fs');
const http = require('http');
const soap = require('soap');

const helloService = {
  Hello_Service: {
    Hello_Port: {
      sayHello: function(args) {
        return {
          greeting: "Hello!!!"+ " " + args.name
        };
	  },
	  getFilms: function(args, callback) {
		  getAllFilms()
		  	.then(films => callback({
				films: JSON.stringify(films)
			}));
	  }
    }
  }
};

const xml = fs.readFileSync('HelloService.wsdl', 'utf8');

const server = http.createServer((req, res) => res.end(`404: Not Found: ${req.url}`));
server.listen(8000);

soap.listen(server, '/wsdl', helloService, xml);

//
const app = express();

mongoose.connect('mongodb://localhost:27017/filmdb');

let Film = mongoose.model('Film', {
	title: String,
	year: Number,
	score: Number
});

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

app.get('/films', (req, res) => {
	getAllFilms()
		.then(films => res.json(films));
});

app.listen(3000, () => console.log("Server started."));
