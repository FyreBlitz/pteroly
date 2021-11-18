const req = require('../../ClientRequest.js')

/**
 * @param {String} serverId ID of the server Disk Usage of
 */
function getDiskUsage(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetDiskUsage', serverId)
}

module.exports = getDiskUsage