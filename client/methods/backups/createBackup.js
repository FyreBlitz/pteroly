const req = require('../ClientRequest.js')

/**
 * @param {String} serverId ID of the server
 */
function createBackup(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.postRequest('CreateBackup', {}, serverId)
}

module.exports = createBackup