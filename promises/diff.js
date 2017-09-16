/**
 * Task: read 3 files (a, b, c) asynchronously one after another
 * and print their contents to console
 */

//
// callback hell

let fs = require('fs');

fs.readFile('a.txt', (err1, a) => {
	if (err1) {
		console.log(err1);
	} else {
		console.log(a);
		fs.readFile('b.txt', (err2, b) => {
			if (err2) {
				console.log(err2);
			} else {
				console.log(b);
				fs.readFile('c.txt', (err3, c) => {
					if (err3) {
						console.log(err3);
					} else {
						console.log(c);
					}
				});
			}
		});
	}
});

//
// promise chain

fs = require('fs-promise');

fs.readFile('a.txt')
	.then((a) => {
		console.log(a);
		return fs.readFile('b.txt');
	})
	.then((b) => {
		console.log(b);
		return fs.readFile('c.txt');
	})
	.then((c) => console.log(c))
	.catch(err3 => console.log(err3));
