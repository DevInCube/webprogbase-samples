let fs = require('fs-extra');

const path = './data/db.json';

async function write(db) {
    try {
        return fs.writeFile(path, JSON.stringify(db, null, 4));
    } catch (err) {
        console.log(err);
    }
}

async function read() {
    try {
        let x = await fs.readFile(path);
        try {
            return JSON.parse(x);
        } catch (err) {
            return {
                users: {
                    id: 0,
                    items: []
                },
                posts: {
                    id: 0,
                    items: []
                }
            };
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createUser: async function (user) {
        let db = await read();
        db.users.id++;
        user.id = db.users.id;
        db.users.items.push(user);
        await write(db);
        return (true);
    },

    createPost: async function (post) {
        let db = await read();
        db.posts.id++;
        post.id = db.posts.id;
        db.posts.items.push(post);
        await write(db);
        return (true);
    },

    getPostsByAuthorId: async function (author_id) {
        let db = await read();
        let posts = db.posts.items.filter(x => x.author_id === author_id);
        return (posts);
    },

    getUserById: async function (id) {
        let db = await read();
        let user = db.users.items.find(x => x.id === id);
        return (user);
    },

    getUsers: async function () {
        let db = await read();
        return (db.users.items);
    },

    getUserByLoginAndPasshash: async function (login, passHash) {
        let db = await read();
        let user = db.users.items.find(x =>
            x.username === login
            && x.passwordHash === passHash);
        return Promise.resolve(user);
    }
};