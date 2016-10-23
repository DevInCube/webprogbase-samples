// page data
var data = {
	
	users: [],
	_nameFilter: "",
	
	get nameFilter() {
		return this._nameFilter;
	},
	set nameFilter(value) {
		this._nameFilter = value;
		console.log(data.nameFilter);
		var nameFilterEl = document.getElementById("nameFilter");
		nameFilterEl.value = data.nameFilter;
		showUsers();
	}
};

// subscribe to onload event
window.addEventListener("load", function(evdata) {
	var nameFilterEl = document.getElementById("nameFilter");
	nameFilterEl.addEventListener("input", function(e) {
		data.nameFilter = e.target.value.toLowerCase().trim();
	});
	
	var clearFilterEl = document.getElementById("clearFilter");
	clearFilterEl.addEventListener("click", function(e) {
		data.nameFilter = "";
	});
	
	var createFormEl = document.getElementById('createUserForm');
	createFormEl.addEventListener('submit', function(event) {
		event.preventDefault();
		var userName = event.target.newUserName.value;
		fakeAjaxCreateUser(userName)
			.then(user => {
				data.users.push(user);
				showUsers();
			})
			.catch(err => console.log(err));
	});
	
	/* load users from server */
	fakeAjaxGetUsers()
		.then(users => {
			data.users = users;
			showUsers();
		})
		.catch(err => console.log(err));
});

function showUsers() {
	// filter users
	var usersList = data.users;
	var filterText = data.nameFilter;
	if (filterText) {
		usersList = data.users.filter(x => x.fullname.toLowerCase().includes(filterText));
	}
	
	// update counter
	var filteredCountEl = document.getElementById("usersCount");
	filteredCountEl.innerText = usersList.length;
	
	// unsubscribe all handlers from old
	var filteredUsersEl = document.getElementById("filteredUsers");
	var removeLinks = filteredUsersEl.getElementsByClassName('remove-link');
	[].slice.call(removeLinks).forEach(link => link.removeEventListener("click", onUserRemoveClicked));  // unsubscribe
	
	// update DOM
	var template = document.getElementById('user-template').innerHTML;
	var renderedHTML = Mustache.render(template, { users: usersList });
	filteredUsersEl.innerHTML = renderedHTML;
	
	// unsubscribe handlers to new links
	removeLinks = filteredUsersEl.getElementsByClassName('remove-link');
	[].slice.call(removeLinks).forEach(link => link.addEventListener("click", onUserRemoveClicked));  // subscribe
}

function onUserRemoveClicked(event) {
	var userId = event.target.attributes.user_id.value;
	fakeAjaxRemoveUser(userId)
		.then(_ => {
			data.users.splice(data.users.findIndex(x => x.id == userId), 1);
			showUsers();
		})
		.catch(err => console.log(err));
}

/* FAKES */

function fakeAjaxCreateUser(username) {
	console.log("Create user on server");
	return Promise.resolve({
		id: 10 + (Math.random() * 100000) | 0,
		fullname: username
	});
};

function fakeAjaxRemoveUser(userId) {
	console.log("Remove user with id " + userId + " on server");
	return Promise.resolve(true);
}

function fakeAjaxGetUsers() {
	return Promise.resolve([
		{
			id: 1,
			fullname: 'Taras Sheva'
		},
		{
			id: 2,
			fullname: 'Some Dude'
		},
		{
			id: 3,
			fullname: 'Taras Shevchenko'
		},
		{
			id: 4,
			fullname: 'Inna Baa'
		},
		{
			id: 5,
			fullname: 'Taras Taras'
		},
		{
			id: 6,
			fullname: 'Sash Kaa'
		}
	]);
}