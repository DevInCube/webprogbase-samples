const express = require('express');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/social-network-db';

const app = express();

app.get('/users', (req, res) => {
	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log(`Error connecting to mongo db at ${url}. Reason: ${err}`);
			res.status(500).end(err);
		} else {
			let usersCollection = db.collection('users');
			usersCollection.find().toArray(function (err, result) {
				if (err) {
					console.log(err);
					res.status(500).end(err);
				} else {
					let allUsers = result;
					res.json(allUsers);
				}
				db.close();
			});
		}
	});
});

app.get('/users/:index', (req, res) => {
	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log(`Error connecting to mongo db at ${url}. Reason: ${err}`);
			res.status(500).end(err);
		} else {
			let usersCollection = db.collection('users');
			usersCollection.findOne({ _id: req.params.index}, function (err, result) {
				if (err) {
					console.log(err);
					res.status(500).end(err);
				} else {
					let user = result;
					res.json(user);
				}
				db.close();
			});
		}
	});
});

/*
function checkIndex(req, res, next) {
	let index = req.params.index;
	if (index >= 0 && index < users.length) {
		next();
	} else {
		res.status(404).end('Not found');
	}
}
app.get('/users/:index', checkIndex, (req, res) => {
	res.json(users[req.params.index]);
});
app.delete('/users/:index', checkIndex, (req, res) => {
	users.splice(req.params.index, 1);
	res.json({ deleted: 1});
});*/

app.listen(3000, () => console.log("Server listening."));
