const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('promised-mongo');

const app = express();

const url = 'mongodb://localhost:27017/vk52';
const db = mongodb(url);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

function sendError(res, reason) {
	res.status(500).json({ error: String(reason) });
}

function sendResult(res, result) {
	res.json({ result });
}

app.get('/users', (req, res) => {
	db.users.find()
		.then(users => sendResult(res, users))
		.catch(err => sendError(res, err));
});

app.get('/users/:id', (req, res) => {
	db.users.findOne({
		_id: mongodb.ObjectId(req.params.id)
	})
		.then(user => {
			if (user)
				sendResult(res, user);
			else
				return Promise.reject(`User with _id ${req.params.id} not found`);
		})
		.catch(err => sendError(res, err));
});

app.delete('/users/:id', (req, res) => {
	db.users.remove({
		_id: mongodb.ObjectId(req.params.id)
	}, true)
		.then(x => sendResult(res, x))
		.catch(err => sendError(res, err));
});

app.put('/users/:id', (req, res) => {

	let fullname = req.body.fullname;
	let year = req.body.year;
	let user = {
		fullname,
		year
	};
	db.users.findAndModify({
		query: { _id: mongodb.ObjectId(req.params.id)},
		update: { $set: user },
		new: false
	})
		.then(x => sendResult(res, x))
		.catch(err => sendError(res, err));
});

app.post('/users', (req, res) => {
	let fullname = req.body.fullname;
	let year = req.body.year;
	let user = {
		fullname,
		year
	};
	db.users.insert(user)
		.then(x => sendResult(res, x))
		.catch(err => sendError(res, err));
});

app.get('/', (req, res) => {

	res.json({});
});

app.listen(3000, () => console.log("App listen at 3000"));
