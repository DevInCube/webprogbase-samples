let fs = require('fs-extra');

const dbpath = './data/db.json';

async function readDatabase() {
    let content = await fs.readFile(dbpath);
    let jsonDB = JSON.parse(content.toString());
    return jsonDB;
}

async function writeDatabase(db) {
    return fs.writeFile(dbpath, JSON.stringify(db, null, 4));
}

module.exports = {
    createUser: async function (user) {
        let db = await readDatabase();
        user.id = db.users.id;
        db.users.id++;
        db.users.items.push(user);
        await writeDatabase(db);
    },

    getUserByLoginAndPass: async function (username, passwordHash) {
        let db = await readDatabase();
        return db.users.items
            .find(x => x.username === username
                && x.passwordHash === passwordHash);
    },

    getUserById: async function (id) {
        let db = await readDatabase();
        return db.users.items
            .find(x => x.id === id);
    }
};