const req = require('../ClientRequest.js')

/**
 * @param {String} serverId ID of the server to connect to the console
 */
function console(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	// return Req.websocket('Console', serverId)
    return 'THIS FEATURE IS STILL IN DEVELOPMENT'
}

module.exports = console