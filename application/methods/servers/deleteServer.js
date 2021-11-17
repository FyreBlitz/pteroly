const req = require('../ApplicationRequest.js')

/**
 *
 * @param {String} internalId Internal ID of the server to delete
 */
function deleteServer(internalId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.deleteRequest('DeleteServer', internalId)
}

module.exports = deleteServer