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
    }
};

window.addEventListener('load', (le) => {
    User.getAll().then(users => {
        data.users = users;
        return Ui.renderUsers(data.users);
    });
});

Ui.filterInputEl.addEventListener('input', (e) => { data.nameFilter = e.target.value; });
Ui.clearFilterEl.addEventListener('click', (e) => { data.nameFilter = ''; });

Ui.createFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const userName = e.target.newUserName.value;
    User.insert(userName).then(user => {
        data.users.push(user);
        return Ui.renderUsers(data.filteredUsers);
    });
});

