const express = require('express')


const app = express()

app.get('/', async (req, res) => {
    res.send('Hi!')
})

const port = 8001
app.listen(port, () => console.log(`Server1 server on port ${port}`))

const amqp = require('amqplib') // promise-based

amqp.connect('amqp://rabbit:5672')
   .then(connection => {
       return connection.createChannel();
   })
   .then(channel => {
       const queue = 'hello'
       channel.assertQueue(queue)
       channel.consume(queue, msg => {
           console.log(msg.content.toString())
           channel.ack(msg);  // acknowledge message
       })
   })
   .catch(err => {
        console.log(`service1 could not connect to amqp`);
        process.abort();   
    });