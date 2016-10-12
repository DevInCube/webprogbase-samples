// SOAP client example
const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';
const args = {
	name: 'SampleName'
};

soap.createClient(url, (err, client) => {
  client.sayHello(args, (err, result) => {
	  console.log(result);
	  console.log(client.describe());
  });
  client.getFilms({ query: ''}, (err, result) => console.log(result));
});
