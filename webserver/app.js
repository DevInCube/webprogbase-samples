// web server contains a list of numbers
//
// GET / 					- returns a list at JSON
// GET /at/:index 			- returns an item at index if it exists, 
//							  otherwise 404
// POST /:value 			- pushes value into list
// POST /at/:index/:value 	- insert value at index
// GET /length 				- returns list length
// DELETE / 				- removes last value

let express = require('express');

let app = express();

let numbers = []; // resource

app.get("/test", (req, res) => res.sendStatus(404));

app.post("/", (req, res) => {
	res.json({
		numbers: numbers,
		length: numbers.length
	});
});

app.get("/users/:id", (req, res) => {
	res.json({
		id: req.params.id,
		category: req.query.category
	});
});

app.use((req, res) => {
	console.log("Fallthrough");
	res.json(["Error"]);
});

app.listen(3000, () => console.log("Started"));
