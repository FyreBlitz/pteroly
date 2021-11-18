const req = require('../../ClientRequest.js')

/**
 * @param {String} serverId ID of the server to kill
 */
function killServer(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	const data = { 'signal': 'kill' }
	return Req.postRequest('KillServer', data, serverId)
}

module.exports = killServer