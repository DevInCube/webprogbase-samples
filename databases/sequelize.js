let Sequelize = require('sequelize');
let sequelize = new Sequelize('database', 'username', 'password');

let User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

sequelize.sync()
    .then(function () {
        return User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        });
    }).then(function (jane) {
        console.log(jane.get({
            plain: true
        }));
    });
