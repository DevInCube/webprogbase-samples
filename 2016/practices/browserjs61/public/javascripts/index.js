let model = {
    users: [],
    filterString: "",

    get filteredUsers() {
        let filter = model.filterString.toLowerCase().trim();
        return !filter 
            ? this.users
            : this.users
                .filter(x => x.name.toLowerCase().includes(filter));
    }
};

window.addEventListener('load', function() {
    let clearEl = document.getElementById('clear_link');
    clearEl.addEventListener('click', function() {
        model.filterString = "";
        document.getElementById('filter_string').value = "";
        renderUsers();
    });

    let inputEl = document.getElementById('filter_string');
    inputEl.addEventListener('input', function(e) {
        //console.log(e.target.value);
        model.filterString = e.target.value;
        renderUsers();
    });
    inputEl.value = model.filterString;

    let createFormEl = document.getElementById('create_user_form');
    createFormEl.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submit', createFormEl.name.value, createFormEl.score.value);
        createUser({
            name: createFormEl.name.value,
            score: createFormEl.score.value
        });
    });

    requestUsers();    
});

function createUser(user) {
    let ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function() {
        if(ajax.readyState === 4 && ajax.status===200) {
            let userObj = JSON.parse(ajax.response);
            model.users.push(userObj);
            renderUsers();
        }
    };

    ajax.open('POST', '/users');
    ajax.setRequestHeader("Content-type",         
        "application/json");
    ajax.send(JSON.stringify(user));
}

function requestUsers() {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        console.log(ajax.readyState, ajax.response, ajax.status);
        if(ajax.readyState === 4 && ajax.status===200) {
            let usersObj = JSON.parse(ajax.response);
            model.users = usersObj;
            renderUsers();
        }
    };

    ajax.open('GET', '/users');
    ajax.send();
}

function renderUsers() {
    let appEl = document.getElementById('app');
    appEl.innerHTML = "";
    let usersListEl = document.createElement('ul');
    usersListEl.className = "list-group";
    usersListEl.setAttribute('id', 'users');
    appEl.appendChild(usersListEl);
    let counterEl = document.createElement('span');
    let filteredUsers = model.filteredUsers;
    counterEl.innerText = `Filter: "${model.filterString}" Total: ${filteredUsers.length}`;
    
    appEl.insertBefore(counterEl, usersListEl);
    for (let user of filteredUsers) {
        let userEl = document.createElement('li');
        userEl.className = "list-group-item";
        let userNameEl = document.createElement('span');
        userNameEl.innerText = user.name;
        let userScoreEl = document.createElement('b');
        userScoreEl.innerText = user.score;
        userEl.appendChild(userNameEl);
        userEl.appendChild(userScoreEl);
        usersListEl.appendChild(userEl);
    }
}