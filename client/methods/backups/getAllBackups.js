const req = require('../ClientRequest.js')

/**
 * @param {String} serverId ID of the server
 */
function getAllBackups(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetAllBackups', serverId)
}

module.exports = getAllBackups