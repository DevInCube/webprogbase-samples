new Vue({
	el: '#users',
	data: {
		users: [
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
		],
		nameFilter: "",
		filteredUsers: this.users
	},
	watch: {
		nameFilter: function(val) {
			console.log(val);
			this.filteredUsers = this.users.filter(x => x.fullname.includes(this.filter));
		}
	}
});
