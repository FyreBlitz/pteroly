const req = require('../ApplicationRequest.js')

/**
 * @param {String} internalId Internal ID of the server to unsuspend
 */
function unSuspendServer(internalId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.postRequest('UnsuspendServer', null, internalId)
}

module.exports = unSuspendServer