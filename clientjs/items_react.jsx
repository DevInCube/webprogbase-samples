console.log("jsx loaded");

var FilterComponent = React.createClass({
	render: function() {
		return (
			<div>
				<p><b>Filter by name:</b></p>
				<input className="form-control" value={this.props.nameFilter} onChange={this.handleInputChange} />
				<a href='#' onClick={this.handleInputClear}>Clear</a>
				<hr />
			</div>
		);
	},
	handleInputChange: function(event) {
		this.props.filterChanged(event.target.value);
	},
	handleInputClear: function(event) {
		this.props.filterChanged("");
	}
});

var User = React.createClass({
	render: function() {
		return (
			<li className='list-group-item'>
				<span className='float-right'><a href='#' onClick={() => this.props.removeUser(this.props.user.id)} >remove</a></span>
				<b>{this.props.user.fullname}</b>
				<span className="user-id"> (id: {this.props.user.id})</span>
			</li>
		);
	}
});

var UsersList = React.createClass({
	render: function() {
		var listComponent = 
			(this.props.users.length === 0) ? 
			(<h3>No users found</h3>) : 
			(
				<ul className='list-group'>
				{
					this.props.users.map(user => (
						<User key={user.id} user={user} removeUser={this.props.removeUser} />
					))
				}
				</ul>
			);
		return (
			<div>
				<p>Count: <b>{this.props.users.length}</b></p>
				<hr />
				{listComponent}
			</div>
		);
	},
});

var CreateUserForm = React.createClass({
	getInitialState: function() {
		return {
			newUserName: "New User"
		};
	},
	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Create new user:</h3>
				</div>
				<div className="panel-body">
					<div className="form-group">
						<label htmlFor="newusername">Username</label>
						<input className="form-control" value={this.state.newUserName}  onChange={this.handleNameChange}/>
					</div>
					<button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
				</div>
			</div>
		);
	},
	handleNameChange: function(event) {
		this.setState({ 
			newUserName: event.target.value 
		});
	},
	handleSubmit: function(event) {
		this.props.createUser(this.state.newUserName);
	}
});

var App = React.createClass({
	getInitialState: function() {
		return {
			users: [],
			nameFilter: ""
		};
	},
	componentDidMount: function() {
		fakeAjaxGetUsers()
			.then(users => this.setState({ 
				users: users 
			}))
			.catch(err => console.log(err));
	},
    render : function(){
		var filterText = this.state.nameFilter.toLowerCase().trim();
		var filteredUsers = this.state.users.filter(x => x.fullname.toLowerCase().includes(filterText));
        return (
			<div className='container'>
				<div className="page-header">
					<h1>Users</h1>
				</div>
				<div className='row'>
					<div className='col-md-8'>
						<FilterComponent nameFilter={this.state.nameFilter} filterChanged={this.onFilterChange}/>
						<UsersList users={filteredUsers} removeUser={this.onRemoveUser}/>
					</div>
					<div className='col-md-4'>
						<CreateUserForm createUser={this.onCreateUser}/>
					</div>
				</div>
			</div>
        );
    },
	onFilterChange: function(newNameFilter) {
		this.state.nameFilter = newNameFilter;
		this.setState(this.state);
	},
	onRemoveUser: function(userId) {
		fakeAjaxRemoveUser(userId)
			.then(_ => {
				this.state.users.splice(this.state.users.findIndex(x => x.id == userId), 1);
				this.setState(this.state);
			})
			.catch(err => console.log(err));
	},
	onCreateUser: function(username) {
		fakeAjaxCreateUser(username)
			.then(user => {
				this.state.users.push(user);
				this.setState(this.state);
			})
			.catch(err => console.log(err));
	}
});

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);