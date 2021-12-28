import req from "../../ApplicationRequest";

/**
 * @param {String} userId External UserID
 * @param {userData} userData The user data
 */


interface userData {
	username: string,
	email: string,
	password: string,
	first_name: string,
	last_name: string,
	root_admin: boolean,
	language: string,
}

interface resultType {
    id: number,
    external_id: null | string,
    uuid: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    language: string,
    root_admin: boolean,
    two_fa: boolean,
    created_at: string,
    updated_at: string,
}

function updateUser(userId: number, userData: userData): Promise<resultType> {
	const Req  = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	const data = createData(userData)
	return Req.patchRequest('EditUser', data, userId)
}

function createData(userData: userData) {
	return {
		'username': userData.username,
		'email': userData.email,
		'password': userData.password,
		'first_name': userData.first_name,
		'last_name': userData.last_name,
		'root_admin': userData.root_admin,
		'language': userData.language,
	}
}

export default updateUser