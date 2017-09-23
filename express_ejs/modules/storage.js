
function User(id, username, fullname, is_excluded, scores) {
	return {
			id: id,
			username: username,
			fullname,
			is_excluded,
			scores
	};
}

let users = [
	new User(1, 'u1', 'I am <h1>Hacker!!</h1>', false, [0, 3]),
	new User(10, 'u10', 'Kolya 1', true, [5, 5]),
	new User(21, 'u21', 'Ira 1', false, [0, 0, 0]),
];


function getUserById(id) {
	return users.find(user => user.id === id);
}

module.exports = {
	getUserById,
};
