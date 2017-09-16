let fs = require('fs');

function onFileRead(err, buffer) {
	if (err) {
		console.log(err.toString());
	} else {
		console.log(buffer.toString());
	}
}

console.log('1');

fs.readFile('app.js', onFileRead);
fs.readFile('app2.js', onFileRead);
fs.readFile('1.txt', onFileRead);

console.log('2');

