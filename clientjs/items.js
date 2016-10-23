// some initialisations
var users = [
	{
		'fullname': 'Taras Sheva'
	},
	{
		'fullname': 'Some Dude'
	},
	{
		'fullname': 'Inna Baa'
	}
];

function filterUsers(source, filterText) {
	return source.filter(x => x.fullname.includes(filterText));
}

function showUsers(usersList) {
	var usersListEl = document.getElementById("users-list");
	while (usersListEl.firstChild) {
	    usersListEl.removeChild(usersListEl.firstChild);
	}
	for (var i = 0; i < usersList.length; i++) {
		var user = usersList[i];
		var userEl = document.createElement('li');
		userEl.className = "list-group-item";
		userEl.innerText = user.fullname;
		usersListEl.appendChild(userEl);
	}
}

// subscribe to onload event
window.addEventListener("load", function(evdata) {
	showUsers(users);

	var filterEl = document.getElementById("filter");
	filterEl.addEventListener("input", function() {
		showUsers(filterUsers(users, filterEl.value));
	});
});
