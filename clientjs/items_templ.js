// some initialisations
var users = [
	{
		'fullname': 'Taras Sheva'
	},
	{
		'fullname': 'Some Dude'
	},
	{
		'fullname': 'Taras Shevchenko'
	},
	{
		'fullname': 'Inna Baa'
	},
	{
		'fullname': 'Taras Taras'
	},
];

function filterUsers(source, filterText) {
	return source.filter(x => x.fullname.includes(filterText));
}

function showUsers(usersList) {
	var usersEl = document.getElementById("users");
	var template = document.getElementById('user-template').innerHTML;
	var rendered = Mustache.render(template, { users: usersList });
	usersEl.innerHTML = rendered;
}

// subscribe to onload event
window.addEventListener("load", function(evdata) {
	showUsers(users);

	var filterEl = document.getElementById("filter");
	filterEl.addEventListener("input", function() {
		showUsers(filterUsers(users, filterEl.value));
	});
});
