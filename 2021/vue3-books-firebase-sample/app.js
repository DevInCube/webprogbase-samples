const express = require('express');
const path = require('path');

const app = express();
app.use(express.static("public"));

app.get('/', (req, res) => res.sendFile('books.html', { root: path.join(__dirname, "views") }));

app.listen(3001, () => console.log("Server is ready"));