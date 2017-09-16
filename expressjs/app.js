const express = require('express');

let app = express();

app.get('/', (req, res) => {
	res.send('Text');
});


app.get('/posts', (req, res) => {
	res.send('POsts');
});


app.post('/posts', (req, res) => {
	res.send('POST new POst');
});

app.get('/posts/:post_id(\\d+)', (req, res) => {
	res.send('POst ' + req.params.post_id);
});

app.use((req, res) => {
	res.send('not found');
});

const PORT = 3000;

app.listen(PORT, () => console.log(`server started at ${PORT}`));

