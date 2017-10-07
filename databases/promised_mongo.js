const pmongo = require('promised-mongo').compatible();

let db = pmongo('mongodb://localhost:27017/sample');

db.users.find()
    .then(users => console.log(users))
    .catch(err => console.log(err.toString()));

