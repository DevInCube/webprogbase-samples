let express = require('express');
let router = express.Router();

let storage = require('./../modules/storage');

// /users/2

function auth(req, res, next) {
	req.user = {
		id: 0,
		username: 'username',
		year: 2016
	};
	next();
}

function checkId(req, res, next) {

	if (req.params.user_id < 10) {
		res.sendStatus(404);
	} else {
		next();
	}
}

router.get('/:user_id(\\d+)',
	(req, res, next) => {
		return next("Error!");
		
		let user = storage.getUserById(parseInt(req.params.user_id));
		if (!user) {
			res.sendStatus(404);
		} else {
			res.render('user', {
				user
			});
		}
	});

module.exports = router;
