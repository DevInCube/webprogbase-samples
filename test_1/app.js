const express = require('express');
const mongodb = require('promised-mongo');

const url = 'mongodb://localhost:27017/social-network-db';
const db = mongodb(url);
const app = express()

app.get('/users', (req, res) => {
	db.users.find().toArray()
		.then(users => res.json(users))
		.catch(err => res.status(500).end(String(err)));
});

app.get('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;
	db.users.findOne({ _id: mongodb.ObjectId(user_id)})
		.then(users => res.json(users))
		.catch(err => res.status(500).end(String(err)));
});

app.post('/users', (req, res) => {
	let new_user = {
		name: 'Some name',
		year: 1990,
		city: 'Kiev'
	};
	db.users.insert(new_user)
		.then(x => res.json(x))
		.catch(err => res.status(500).end(String(err)));
});

app.put('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;
	let updates = {
		name: 'Updated name',
		year: 2016,
		city: 'Odessa'
	};
	db.users.findAndModify({
			query: { _id: mongodb.ObjectId(user_id)},
			update: { $set: updates },
			new: true
		})
		.then(x => res.json(x))
		.catch(err => res.status(500).end(String(err)));
});

app.delete('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;
	db.users.remove({ _id: mongodb.ObjectId(user_id)})
		.then(users => res.json(users))
		.catch(err => res.status(500).end(String(err)));
});

app.listen(3000, () => console.log("Server listening."));
