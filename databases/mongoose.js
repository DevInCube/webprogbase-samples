const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sample')
    .then(() => console.log('Connected'))
    .catch(err => console.log(err.toString()));

let Film = mongoose.model('Film', {
    title: String, 
    description: String,
    score: Number,
    year: String,
    actors: Array
});
    
let film1 = new Film({
    title: 'It',
    description: 'We all float down here',
    score: 10.0,
    year: '2017',
    actors: []
});

film1.save()
    .then(x => console.log("Created", x))
    .then(() =>  Film.findOne({ title: 'Forest Gump'}).exec())
    .then(film => console.log('GEt', film))
    .then(() => Film.find().exec())
    .then(films => console.log("All", films))
    .catch(err => console.log(err.toString()));