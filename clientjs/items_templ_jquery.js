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
$( document ).ready(function(evdata) {
	$("#nameFilter").input(function(e) {
		data.nameFilter = e.target.value.toLowerCase().trim();
	});
	
	$("#clearFilter").click(function(e) {
		data.nameFilter = "";
	});
	
	$("#createUserForm").submit(function(event) {
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
	$('#usersCount').text(usersList.length);
	
	// unsubscribe all handlers from old
	var filteredUsersEl = $("#filteredUsers");
	var removeLinks = $('.remove-link');
	[].slice.call(removeLinks).forEach(link => link.off("click", onUserRemoveClicked));  // unsubscribe
	
	// update DOM
	var template = $('.user-template').html();
	var renderedHTML = Mustache.render(template, { users: usersList });
	filteredUsersEl.html(renderedHTML);
	
	// unsubscribe handlers to new links
	removeLinks = $('.remove-link');
	[].slice.call(removeLinks).forEach(link => link.on("click", onUserRemoveClicked));  // subscribe
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