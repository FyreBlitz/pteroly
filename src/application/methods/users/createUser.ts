import req from "../../ApplicationRequest";

/**
 * @param {String} username Users username
 * @param {String} email Users email
 * @param {String} password Users password
 * @param {String} firstName Users first name
 * @param {String} lastName Users last name
 * @param {Boolean} isAdmin Is the user admin? (true/false)
 * @param {String} language Language, Normally en/fr (2 letter languages)
 */
function createUser(username: string, email: string, password: string, firstName: string, 
	lastName: string, isAdmin: boolean, language: string) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	const data = createData(username, email, password, firstName, lastName, isAdmin, language)
	return Req.postRequest('CreateUser', data, null)
}

function createData(username: string, password: string, email: string, firstName: string, lastName: string, isAdmin: boolean, language: string) {
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

export default createUser