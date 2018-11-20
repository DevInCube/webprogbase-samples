const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, './public')));

const fileOptions = { root: path.join(__dirname, './views')};

app.get("/", (req, res) => {
    res.sendFile('index.html', fileOptions);
});

app.get("/api/items", (req, res) => {
    res.send([1, 1, 2, 3, 5, 8, 13]);
});

app.listen(3000, () => console.log('Started'));