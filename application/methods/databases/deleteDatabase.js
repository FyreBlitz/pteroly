const req = require('../ApplicationRequest.js')

function deleteDatabase(internalId, databaseId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.deleteRequest('DeleteDatabases', internalId, databaseId)
}

module.exports = deleteDatabase