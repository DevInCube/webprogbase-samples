const Sequelize = require('sequelize');
const cn = 'postgres://u:user@localhost:5432/local';

const sequelize = new Sequelize(cn, {
    define: {
        timestamps: false
    },
});

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: Sequelize.STRING,
    fullname: Sequelize.STRING,
    group_id: Sequelize.INTEGER
});

Users.findAll()
    .then(users => {
        console.log(users.map(x => x.get("fullname")));
    })
    .catch(err => console.log(err.toString()));

// const db = pgp(cn);

// db.query('SELECT * FROM users WHERE group_id = $1;', [ 1 ])
//     .then(users => {
//         console.log(users);
//     })
//     .catch(err => console.log(err.toString()));