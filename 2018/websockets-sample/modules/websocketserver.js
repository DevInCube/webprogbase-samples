const WebSocketServer = require('ws').Server;

class WsServer {
    constructor(server) {
        this.connections = [];
        this.wsServer = new WebSocketServer({
            server: server
        });

        this.wsServer.on('connection', (connection) => {
            console.log(`WS> Got connection request`);
            this.addConnection(connection);
            connection.send("[Server]: Welcome!");
            connection.on('message', (message) => this.notifyAll(message.toString()));
            connection.on('close', () => {
                console.log(`Closing connection`);
                this.removeConnection(connection);
            });
        });
    }

    addConnection(connection) {
        this.connections.push(connection);
    }

    removeConnection(connection) {
        this.connections = this.connections.filter(x => x !== connection);
    }

    notifyAll(text) {
        console.log(`WS> Notify all (${this.connections.length}) with: ${text}`);
        for (const connection of this.connections) {
            connection.send(text);
        }
    }
};

module.exports = WsServer;