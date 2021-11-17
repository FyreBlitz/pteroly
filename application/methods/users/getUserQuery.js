const req = require('../ApplicationRequest.js')
/**
 * @param {String} email Specify a page, leave blank if you dont want to paginate
 */

function getUserQuery(email) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('UserQuery', email)
}

module.exports = getUserQuery