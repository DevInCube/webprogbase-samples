const http = require('http');
const webSocketServer = require('websocket').server;
const express = require('express');

let app = express();
app.set('view engine', 'ejs');
app.use('/*', (req, res) => {
	res.render('index_ws');
});

let server = http.createServer();
let wsServer = new webSocketServer({
    httpServer: server
});

let clients = [];

function broadcast(message, except) {
	clients
		.filter(x => x.socket._peername.port != except)
		.forEach(x => x.sendUTF(message));
}

wsServer.on('request', function(request) {  
    let connection = request.accept(null, request.origin);
	let port = connection.socket._peername.port;
	broadcast('New connection on port ' + port);
	clients.push(connection);
    connection.sendUTF("Welcome on server! Your port is " + port);
    connection.on('message', function(message) {
        let data = message.utf8Data;
		broadcast(port + " > "+ data, port);
    });
    connection.on('close', function(connection) { 
		// @todo
	});
});

app.listen(3000, () => console.log('App started at 3000'));
server.listen(3001, () => console.log('WebSocket server started at 3001'));