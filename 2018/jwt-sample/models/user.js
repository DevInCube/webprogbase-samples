const fakeUser = { id: 1, username: "user" };

module.exports = {
    async findOne() {
        return fakeUser;
    },
    async findOneById() {
        return fakeUser;
    }
};