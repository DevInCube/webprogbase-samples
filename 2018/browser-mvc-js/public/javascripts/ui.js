// ui.js
const Ui = {
    filterInputEl: document.getElementById('nameFilter'),
    clearFilterEl: document.getElementById('clearFilter'),
    createFormEl: document.getElementById('createUserForm'),
    filteredUsersEl: document.getElementById('filteredUsers'),
    get listOfRemoveLinks() {
        return document.getElementsByClassName('remove-link');
    },

    listTemplate: null,
    async loadListTemplate() {
        const response = await fetch('/templates/users.mst');
        this.listTemplate = await response.text();
    },

    setFilter(filter) { this.filterInputEl.value = filter; },

    renderUsers(users) {
        // remove old list and unsubscribe all handlers
        for (const link of this.listOfRemoveLinks) {
            link.removeEventListener("click", onUserRemoveClicked)
        }
        // update DOM
        const template = this.listTemplate;
        const data = { users: users };
        const renderedHTML = Mustache.render(template, data);
        this.filteredUsersEl.innerHTML = renderedHTML;
        // subscribe handlers to new links
        for (const link of this.listOfRemoveLinks) {
            link.addEventListener("click", onUserRemoveClicked)
        }
    },
};

async function onUserRemoveClicked(e) {
    const userId = parseInt(e.target.getAttribute("user_id"));
    if (await User.delete(userId)) {
        data.removeUser(userId);
    }
}


