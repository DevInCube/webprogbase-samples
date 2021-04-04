const express = require('express')

const app = express()

app.get('/', async (req, res) => {
    res.send('Hi!')
})

const jwtKey = process.env.JWT_KEY
console.log(`JWT_KEY`, jwtKey)

const port = 8000
app.listen(port, () => console.log(`Auth server on port ${port}`))

const amqp = require('amqplib')

amqp.connect('amqp://rabbit:5672')
   .then(connection => {
       return connection.createChannel();
   })
   .then(channel => {
       const queue = 'hello'
       channel.assertQueue(queue)
       setInterval(() => {
          channel.sendToQueue(queue, Buffer.from(`Hello world: ${new Date().toISOString()}`))
       }, 1000)
       
   })
   .catch(err => {
        console.log(`auth could not connect to amqp`);
        process.abort();   
   });