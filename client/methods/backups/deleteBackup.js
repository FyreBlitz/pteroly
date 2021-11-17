const req = require('../ClientRequest.js')

/**
 * @param {String} serverId ID of the server
 */
function deleteBackup(serverId, backupId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.deleteRequest('DeleteBackup', serverId, backupId)
}

module.exports = deleteBackup