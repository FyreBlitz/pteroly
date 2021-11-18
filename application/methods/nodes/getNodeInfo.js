const req = require('../../ApplicationRequest.js')

/**
 * @param {String} nodeId The node ID to get the details of.
 */
function getNode(nodeId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetNodeInfo', nodeId)
}

module.exports = getNode