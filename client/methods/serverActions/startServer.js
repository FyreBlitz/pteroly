const req = require('../../ClientRequest.js')

/**
 * @param {String} serverId ID of the server to start
 */
function startServer(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	const data = { 'signal': 'start' }
	return Req.postRequest('StartServer', data, serverId)
}

module.exports = startServer