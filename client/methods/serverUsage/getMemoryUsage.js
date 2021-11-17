const req = require('../ClientRequest')

/**
 * @param {String} serverId ID of the server RAM Usage of
 */
function getRAMUsage(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetMemoryUsage', serverId)
}

module.exports = getRAMUsage
