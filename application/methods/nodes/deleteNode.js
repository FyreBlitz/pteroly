const req = require('../ApplicationRequest.js')

/**
 *
 * @param {String} nodeId The node ID to delete
 */
function deleteNode(nodeId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.deleteRequest('DeleteNode', nodeId)
}

module.exports = deleteNode