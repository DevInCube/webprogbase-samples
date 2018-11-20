
const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const http = require('http');

const app = express();
const server = http.createServer(app);
//
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('mst', mustache());
app.set('views', './views');
app.set('view engine', 'mst');
//

app.get('/', (req, res) => res.render('index'));

const WebSocketServer = require('./modules/websocketserver');
const wsServer = new WebSocketServer(server);
app.get('/test', async (req, res) => {
    await wsServer.notifyAll(`Test notification`);
    res.send('OK');
});

const port = 3000;
server.listen(port, () => console.log(`Web server started at ${port}`));