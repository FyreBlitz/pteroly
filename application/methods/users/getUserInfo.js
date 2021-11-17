const req = require('../ApplicationRequest.js')

function getUserInfo(userId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetUserInfo', userId)
}

module.exports = getUserInfo