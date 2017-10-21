let db = {
    id: 0,
    items: []
};

module.exports = {
    createUser: function (user) {
        db.id++;
        user.id = db.id;
        db.items.push(user);
        return Promise.resolve(true);
    },

    getUserById: function (id) {
        let user = db.items.find(x => x.id === id);
        return Promise.resolve(user);
    },

    getUsers: function () {
        return Promise.resolve(db.items);
    },

    getUserByLoginAndPasshash: function (login, passHash) {
        let user = db.items.find(x =>
            x.username === login
            && x.passwordHash === passHash);
        return Promise.resolve(user);
    }
};