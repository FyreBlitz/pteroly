const req = require('../ClientRequest.js')

/**
 * @param {String} serverId ID of the server to get
 */
function getServerPort(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetServerPort', serverId)
}

module.exports = getServerPort