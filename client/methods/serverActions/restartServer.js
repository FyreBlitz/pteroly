const req = require('../ClientRequest.js')

/**
 * @param {String} serverId ID of the server to restart
 */
function restartServer(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	const data = { 'signal': 'restart' }
	return Req.postRequest('RestartServer', data, serverId)
}

module.exports = restartServer