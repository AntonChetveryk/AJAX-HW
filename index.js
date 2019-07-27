let users = [];
const API = 'https://test-users-api.herokuapp.com/';
const nameEl = document.getElementById('name');
const ageEl = document.getElementById('age');
const btnCreate = document.getElementById('create');
const container = document.querySelector('.container');

btnCreate.addEventListener('click', () => {
	const user = {
		name: nameEl.value,
		age: ageEl.value
	};
	console.log(user);
	fetch(API + 'users', {
		method: 'POST',
		body: JSON.stringify(user)
	}).then((res) => {
		return res.json()
	}).then((id) => {
		user.id = id;
		users.push(user);
		renderUsers();
	}).catch((error) => {
		console.log(error)
	});
})

function getUsers() {
	return fetch(API + 'users').then(res => {
		return (res.json());
	}).catch(err => {
		console.log('error');
	})
}
function deleteUsers(userId) {
	console.log(userId);
	return fetch(API + 'users/' + userId, {
		method: 'DELETE'
	}).then(() => {
		return users = users.filter(function (user) {
			return users.id !== userId;
		})
	}).catch(err => {
		console.log('error');
	})
}

function renderUsers() {
	container.innerHTML = '';
	users.forEach((user) => {
		const div = document.createElement('div');
		div.style.marginTop = '50px';
		div.innerHTML = `<h4>${user.name}</h4><h5>${user.age}</h5>`
		const btn = document.createElement('button');
		btn.innerText = 'delete';
		btn.addEventListener('click', () => {
			deleteUsers(users.id).then(() => {
				div.remove();
				btn.remove();
			})
		})
		document.body.append(container);
		container.append(div);
		container.append(btn);
	})
}

getUsers().then(data => {
	users = data.data;
	renderUsers()
});



