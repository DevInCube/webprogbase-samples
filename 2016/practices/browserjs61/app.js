let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();

const sendFileOpts = {
    root: path.join(__dirname, 'views')
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',
    async (req, res) => {
        res.sendFile('index.html', sendFileOpts);
    });

app.listen(3000, () => console.log(`Up!`));