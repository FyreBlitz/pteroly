const req = require('../../ApplicationRequest.js')

function getServerInfo(internalId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetServerInfo', internalId)
}

module.exports = getServerInfo