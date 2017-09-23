const http = require('http');
const url = require('url');
const ejs = require('ejs');
const fs = require('fs');

const PORT = 3000;

let server = http.createServer(onRequest);
server.listen(PORT, onListen);

function onListen() {
	console.log('Web server is listening at', PORT);
}

function User(id, username, fullname, is_excluded, scores) {
	return {
		id: id,
		username: username,
		fullname,
		is_excluded,
		scores
	};
}

let users = [
	new User(1, 'u1', 'I am <h1>Hacker!!</h1>', false, [0, 3]),
	new User(10, 'u10', 'Kolya 1', true, [5, 5]),
	new User(21, 'u21', 'Ira 1', false, [0, 0, 0]),
];

function getUserById(id) {
	return users.find(user => user.id === id);
}

function onRequest(req, res) {
	let urlPath = url.parse(req.url).pathname;
	console.log('Got request for', urlPath);
	res.writeHead(200, { 'Content-Type': 'text/html' });
	let user_id = parseInt(urlPath.substr(1));
	let user = getUserById(user_id);
	let uname = (user ? user.fullname : 'No such user');

	fs.readFile('./user.ejs', (err, data) => {
		let html = ejs.render(
			data.toString(),
			{
				fullname: uname,
				id: user_id,
				is_excluded: user ? user.is_excluded : false,
				scores: user ? user.scores : []
			});
	
		res.end(html);
	});
	
}
