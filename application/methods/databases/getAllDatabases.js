const req = require('../../ApplicationRequest.js')

function getAllDatabases(internalId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetAllDatabases', internalId)
}

module.exports = getAllDatabases