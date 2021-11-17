const req = require('../ApplicationRequest.js')

/**
 * @param {String} userId External UserID
 * @param {String} username Users username
 * @param {String} email Users email
 * @param {String} password Users password
 * @param {String} firstName Users first name
 * @param {String} lastName Users last name
 * @param {Boolean} isAdmin Is the user admin? (true/false)
 * @param {String} language Language, Normally en/fr (2 letter languages)
 */
function updateUser(userId, username, email, password, firstName, lastName, isAdmin, language) {
	const Req  = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	const data = createData(username, email, password, firstName, lastName, isAdmin, language)
	return Req.patchRequest('EditUser', data, userId)
}

function createData(username, email, password, firstName, lastName, isAdmin, language) {
	return {
		'username': username,
		'email': email,
		'password': password,
		'first_name': firstName,
		'last_name': lastName,
		'root_admin': isAdmin,
		'language': language,
	}
}

module.exports = updateUser