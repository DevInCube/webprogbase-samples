const rpc = require('node-json-rpc');

const options = {
  // int port of rpc server, default 5080 for http or 5433 for https
  port: 8001,
  // string domain name or ip of rpc server, default '127.0.0.1'
  host: '127.0.0.1',
  // string with default path, default '/'
  path: '/jsonrpc',
  // boolean false to turn rpc checks off, default true
  strict: true
};

// Create a client object with options
const client = new rpc.Client(options);

client.call(
  {
	  "jsonrpc": "2.0",  // optional
	  "method": "getFilms",
	  "params": [],
	  "id": 0   // optional
  },
  (err, res) => {
    // Did it all work ?
    if (err) { console.log(err); }
    else { console.log(res); }
  }
);
