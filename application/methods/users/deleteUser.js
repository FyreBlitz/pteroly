const req = require('../ApplicationRequest.js')

/**
 * @param {String} userId The user ID to delete
 */
function deleteUser(userId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.deleteRequest('DeleteUser', userId)
}

module.exports = deleteUser