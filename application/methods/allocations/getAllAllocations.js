const req = require('../../ApplicationRequest.js')

function getAllAllocations(nodeId, page) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	if (page != null) return Req.getRequest('GetAllAllocations', nodeId, page)
	return Req.getRequest('GetAllAllocations', nodeId)
}

module.exports = getAllAllocations