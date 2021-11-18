const req = require('../../ApplicationRequest.js')

function getAllServers(page) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	if (page != undefined) return Req.getRequest('GetAllServers', null, page)
	return Req.getRequest('GetAllServers', null)
}

module.exports = getAllServers