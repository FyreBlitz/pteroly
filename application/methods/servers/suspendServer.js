const req = require('../ApplicationRequest.js')

/**
 * @param {String} internalId Internal ID of the server to suspend
 */
function suspendServer(internalId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.postRequest('SuspendServer', null, internalId)
}

module.exports = suspendServer