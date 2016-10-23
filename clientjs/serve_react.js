const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
	let url = req.url;
	if (url === '/') url = '/items_react.html';
	url = url.split('/')[1];
	fs.readFile(url, (err, data) => {
		if (err) {
			res.end("Error");
		} else {
			res.end(data.toString());
		}
	});
});
server.listen(3000, () => console.log('server started'));