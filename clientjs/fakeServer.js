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