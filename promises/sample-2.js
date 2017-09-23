

function getUserById(id) {
	// some async operation
	let error = id <= 0 ? 'Error!' : null;
	let user = {
		id: id,
		fullname: 'User Name'
	};

	return new Promise(function (resolve, reject) {
		if (error) reject(error);
		else resolve(user);
	});
}

function getPostById(id) {
	return Promise.resolve({
		id: id,
		title: 'Post-' + id.toString()
	});
}

function getAllPosts(user_id) {
	console.log('User posts', user_id);
	return Promise.resolve([1, 4, 5]);
}

getUserById(2)
	.then(user => getAllPosts(user.id))
	.then(post_ids => Promise.all(post_ids.map(id => getPostById(id))))
	.then(posts => console.log(posts))
	.catch(err => console.error(err))
	.then(() => console.log('After error'));

// (err, user) => {
// 	if (err) console.error(err);
// 	else console.log(user);
// }
