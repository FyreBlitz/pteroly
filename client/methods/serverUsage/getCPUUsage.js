const req = require('../../ClientRequest.js')

/**
 * @param {String} serverId ID of the server CPU Usage of
 */
function getCPUUsage(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetCPUUsage', serverId)
}

module.exports = getCPUUsage