const pgp = require('pg-promise')({});

const cn = 'postgres://u:user@localhost:5432/local';

const db = pgp(cn);

db.query('SELECT * FROM users WHERE group_id = $1;', [ 1 ])
    .then(users => {
        console.log(users);
    })
    .catch(err => console.log(err.toString()));