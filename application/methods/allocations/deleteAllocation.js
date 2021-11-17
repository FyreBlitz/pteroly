const req = require('../../ApplicationRequest.js')

function deleteAllocation(nodeId, allocationId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.deleteRequest('DeleteAllocation', nodeId, allocationId)
}

module.exports = deleteAllocation