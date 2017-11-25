let model = {
    users: []
};

window.addEventListener('load', function () {

    let formEl = document.getElementById('create_form');
    formEl.addEventListener('submit', function(e) {
        e.preventDefault();

        let newUser = {
            name: e.target.name.value,
            score: 0
        };
        console.log('Submitted', newUser);
        createUser(newUser, function (err, newUserFromServer) {
            if (err) return console.log(err);
            console.log(newUserFromServer);
            model.users.push(newUserFromServer);
            renderUsers(model.users);
        });
    });

    loadUsers((err, users) => {
        if (err) return console.log(err);
        console.log(users);
        model.users = users;
        renderUsers(model.users);
    });
});

function loadUsers(callback) {
    let uri = '/api/users';
    let ajax = new XMLHttpRequest();

    ajax.onerror = function(err) { callback(err, null); };
    ajax.onload = function(response) { 
        let users = response.target.responseText;
        callback(null, JSON.parse(users)); 
    };

    ajax.open('GET', uri);
    ajax.send();
}

function createUser(user, callback) {
    let uri = '/api/users';
    let ajax = new XMLHttpRequest();

    ajax.onerror = function(err) { callback(err, null); };
    ajax.onload = function(response) { 
        let newUserObject = JSON.parse(response.target.responseText);
        callback(null, newUserObject); 
    };

    ajax.open('POST', uri);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify(user));
}

function renderUsers(users) {
    let appEl = document.getElementById('app');
    appEl.innerHTML = "";
    let listEl = document.createElement('ul');
    appEl.appendChild(listEl);
    for (let user of users) {
        let userEl = document.createElement('li');
        userEl.innerHTML = `${user.name} (${user.id})`;
        listEl.appendChild(userEl);
    }
}