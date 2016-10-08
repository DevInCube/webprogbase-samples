const express = require('express');
const app = express();

// generic request handler
app.use(function (req, res) {
	console.log(req.method);
	console.log(req.url);
	console.log(req.query);
  	res.send('Hello World!');
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
