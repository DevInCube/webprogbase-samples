const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');

const Film = require('./models/film');
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

app.get('/', (req, res) => res.render('index'));
app.get('/films', (req, res) => {
	getAllFilms()
		.then(films => res.render('films', { films }));
});

// REST API
const apiRouter = express.Router();
apiRouter.get('/films', (req, res) => {
	// @todo get url arguments and filter result list
	getAllFilms()
		.then(films => res.json(films));
});
apiRouter.get('/films/:film_id', (req, res) => {
	Film.findOne({ _id: req.params.film_id }).exec()
		.then(films => res.json(films));
});
apiRouter.post('/films', (req, res) => {
	// @todo get new film data from request and insert it into db
	res.json({ response: 1 });
});
apiRouter.put('/films/:film_id', (req, res) => {
	// @todo get film data from request and update existing film
	res.json({ response: 1 });
});
apiRouter.delete('/films/:film_id', (req, res) => {
	Film.remove({ _id: req.params.film_id })
		.then(result => {
			if (result.result.n === 0) return Promise.reject('Not found');
			else res.json(result);
		})
		.catch(err => res.status(404).json({ error: err }));
});
app.use('/api', apiRouter);

const WEB_PORT = 3000;
app.listen(3000, () => console.log(`Server is listening at ${WEB_PORT}`));

// JSON-RPC Service
const rpc = require('node-json-rpc');

const options = {
  // int port of rpc server, default 5080 for http or 5433 for https
  port: 8001,
  // string domain name or ip of rpc server, default '127.0.0.1'
  host: '127.0.0.1',
  // string with default path, default '/'
  path: '/jsonrpc',
  // boolean false to turn rpc checks off, default true
  strict: false
};

// Create a server object with options
const serv = new rpc.Server(options);

// Add your methods
serv.addMethod('getFilms', (parameters, callback) => {
	getAllFilms()
	  	.then(films => callback(null, films))
		.catch(err => callback(err, null));
});

// Start the server
serv.start((error) => {
  if (error) throw error;
  else console.log(`JSON-RPC Server is running at ${options.port} ${options.path} ...`);
});

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
const SOAP_PORT = 8000;
server.listen(SOAP_PORT, () => console.log(`SOAP Server is running at ${SOAP_PORT} /wsdl?wsdl`));

soap.listen(server, '/wsdl', helloService, xml);
