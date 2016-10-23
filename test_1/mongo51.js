const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('promised-mongo');

const url = 'mongodb://localhost:27017/vk51';
const db = mongodb(url);
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index'));

let userRouter = express.Router();
app.use('/api/user', userRouter);

function createError(message) {
	return { error: message };
}
function createResult(message) {
	return { result: message };
}

userRouter.get('/', (req, res) => {
	db.users.find()
		.then(users => res.json(users))
		.catch(err => createError(String(err)));
});

userRouter.get('/:index', (req, res) => {
	let index = req.params.index;

	db.users.findOne({ _id: mongodb.ObjectId(index) })
		.then(user => {
			if (user) {
				res.json(user);
			} else {
				res.json(createError("Not found"));
			}
		})
		.catch(err => res.json(createError(String(err))));
});

userRouter.delete('/:index', (req, res) => {
	let index = req.params.index;

	db.users.remove({ _id: mongodb.ObjectId(index) }, true)
		.then(() => res.json(createResult('User deleted')))
		.catch(err => res.json(createError(err)));
});

userRouter.put('/:index', (req, res) => {
	let index = req.params.index;
	let updates = {
		fullname: req.body.fullname ? req.body.fullname: undefined,
		year: req.body.year ? req.body.year: undefined
	};
	db.users.findAndModify({
		query: { _id: mongodb.ObjectId(index)},
		update: { $set: updates },
		new: false
	})
		.then(() => res.json(createResult('User updated')))
		.catch(err => res.json(createError(err)));
});

userRouter.post('/', (req, res) => {
	let userid = req.body.id;
	let username = req.body.fullname;
	let year = req.body.year;
	if (userid && username && year) {
		let user = {
			id: userid,
			fullname: username,
			year: year
		};
		db.users.insert(user)
			.then((x) => res.json(createResult(`New user created. ${JSON.stringify(x)}`)))
			.catch((err) => res.json(createError(`Insertion error ${err}`)));
	} else {
		res.json(createError("Invalid user data"));
	}
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
