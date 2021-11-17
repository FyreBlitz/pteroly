const req = require('../ClientRequest.js')

/**
 * @param {String} serverId ID of the server cores of
 */
function getCPUCores(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetDisk', serverId)
}

module.exports = getCPUCores