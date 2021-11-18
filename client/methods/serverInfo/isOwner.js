const req = require('../../ClientRequest.js')

/**
 * @param {String} serverId ID of the server to check owner value of
 */
function isOwner(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('IsOwner', serverId)
}

module.exports = isOwner