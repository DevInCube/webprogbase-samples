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
    createPost: async function (post) {
        let db = await readDatabase();
        post.id = db.posts.id;
        db.posts.id++;
        db.posts.items.push(post);
        await writeDatabase(db);
        return post;
    },

    getPostsByAuthorId: async function (author_id) {
        let db = await readDatabase();
        return db.posts.items
            .filter(x => x.author_id === author_id);
    },

    createUser: async function (user) {
        let db = await readDatabase();
        user.id = db.users.id;
        db.users.id++;
        db.users.items.push(user);
        await writeDatabase(db);
        return user;
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