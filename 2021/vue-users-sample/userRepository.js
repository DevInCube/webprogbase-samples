const UserRepository = {
    // fake "server" users
    users: [
        { id: 1, fullname: "Admin" },
        { id: 2, fullname: "User" },
    ],

    get nextId() {
        const ids = this.users.map(x => x.id);
        return ids.length !== 0
            ? ids.sort().reverse()[0] + 1
            : 1;
    },

    async getAll() {
        // return a copy
        return this.users.slice();
    },  // list (user)

    async insert(username) {
        const user = {
            id: this.nextId,
            fullname: username
        };
        this.users.push(user);
        return user;
    },  // object (user)

    async delete(userId) {
        const index = this.users.findIndex(x => x.id === userId);
        if (index < 0) { return Promise.resolve(false); }
        this.users.splice(index, 1);
        return true;
    },  // bool
};