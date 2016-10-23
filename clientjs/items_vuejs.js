window.addEventListener('load', function() {
	new Vue({
		el: '#users',
		data: {
			users: [],
			nameFilter: ""
		},
		computed: {
			filteredUsers: function () {
				var filterString = this.nameFilter.toLowerCase().trim();
				if (this.nameFilter) {
					return this.users.filter(x => x.fullname.toLowerCase().includes(filterString));
				} else {
					return this.users;
				}
			}
		},
		watch: {
			nameFilter: function(val) {
				console.log(val);
			}
		},
		methods: {
			fetchUsers: function() {
				fakeAjaxGetUsers()
					.then(users => this.users = users)
					.catch(err => console.log("Can't fetch users from server"));
			},
			clearFilter: function() {
				this.nameFilter = "";
			},
			createUser: function(event) {
				event.preventDefault();
				var newUserName = event.target.newusername.value;
				fakeAjaxCreateUser(newUserName)
					.then(user => this.users.push(user))
					.catch(err => console.log("Can't create user on server"));
			},
			removeUser: function(event) {
				var userId = event.target.attributes.user_id.value;
				fakeAjaxRemoveUser(userId)
					.then(x => this.users.splice(this.users.findIndex(x => x.id == userId), 1))
					.catch(err => console.log("Can't remove user on server"));
			}
		},
		created: function() {
			console.log("vue is created. Fetching users");
			this.fetchUsers();
		}
	});
});

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