let express = require('express');
let bodyParser = require('body-parser');
let busboyBodyParser = require('busboy-body-parser');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboyBodyParser());

app.post('/form',
    async (req, res) => {
        console.log(req.body, req.files);
        res.json({});
    });

app.listen(3000, () => console.log('UP!'));