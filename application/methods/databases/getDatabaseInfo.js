const req = require('../ApplicationRequest.js')

function getDatabaseInfo(internalId, databaseId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetDatabaseInfo', internalId, databaseId)
}

module.exports = getDatabaseInfo