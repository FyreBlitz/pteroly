const req = require('../../ClientRequest.js')

/**
 * @param {String} serverId ID of the server
 * @param {String} backupId ID of the Backup
 */
function getBackupInfo(serverId, backupId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetBackupInfo', serverId, backupId)
}

module.exports = getBackupInfo