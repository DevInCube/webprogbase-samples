let fs = require('fs');

function myReadFile(filename) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filename, (err, data) => {
			if (err) reject(err);
			else resolve(data.toString());
		});
	});
}

myReadFile('app1.js')
	.then(data => console.log(data))
	.catch(err => console.error(err));
