let fs = require('fs');

function readFilePromised(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}


// usage

readFilePromised('1.txt') // async call with callbacks
	.then(data => data.toString())
	.then(str => console.log(str))
	.then(newFile => readFilePromised(newFile))  // next async call
	.then(data => console.log(data.toString()))
	.catch(err => console.log(err.toString()));  // handle errors

