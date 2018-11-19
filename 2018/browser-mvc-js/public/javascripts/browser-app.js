// browser-app.js
const data = {
    users: [],
    _nameFilter: "",

    get nameFilter() {
        return this._nameFilter.toLowerCase().trim();
    },
    set nameFilter(value) {
        this._nameFilter = value;
        Ui.setFilter(this.nameFilter);
        Ui.renderUsers(this.filteredUsers);
    },

    // computed property
    get filteredUsers() {
        const filterText = this.nameFilter;
        return !filterText
            ? this.users
            : this.users.filter(x =>
                x.fullname.toLowerCase()
                    .includes(filterText));
    },

    setUsers(users) {
        this.users = users;
        Ui.renderUsers(this.filteredUsers);
    },
    addUser(user) { 
        this.users.push(user); 
        Ui.renderUsers(this.filteredUsers);
    },
    removeUser(userId) { 
        this.users = this.users.filter(x => x.id !== userId); 
        Ui.renderUsers(this.filteredUsers);
    },
};

window.addEventListener('load', async (le) => {
    await Ui.loadListTemplate();
    const users = await User.getAll();
    data.setUsers(users)
});

Ui.filterInputEl.addEventListener('input', (e) => { data.nameFilter = e.target.value; });
Ui.clearFilterEl.addEventListener('click', (e) => { data.nameFilter = ''; });

Ui.createFormEl.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userName = e.target.newUserName.value;
    const user = await User.insert(userName);
    data.addUser(user);
});

