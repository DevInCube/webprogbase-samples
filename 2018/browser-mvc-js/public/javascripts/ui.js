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
        if (!this.listTemplate) {
            const response = await fetch('/templates/users.mst');
            this.listTemplate = await response.text();
        }
        return this.listTemplate;
    },

    setFilter(filter) { this.filterInputEl.value = filter; },
    
    async renderUsers(users) {
        // remove old list and unsubscribe all handlers
        for (const link of this.listOfRemoveLinks) {
            link.removeEventListener("click", onUserRemoveClicked)
        }
        // update DOM
        const template = await this.loadListTemplate();
        const data = { users: users };
        const renderedHTML = Mustache.render(template, data);
        this.filteredUsersEl.innerHTML = renderedHTML;
        // subscribe handlers to new links
        for (const link of this.listOfRemoveLinks) {
            link.addEventListener("click", onUserRemoveClicked)
        }
    },
};

function onUserRemoveClicked(e) {
    const userId = parseInt(e.target.getAttribute("user_id"));
    User.delete(userId).then(res => {
        data.users = data.users.filter(x => x.id !== userId);
        Ui.renderUsers(data.filteredUsers);
    });
}


