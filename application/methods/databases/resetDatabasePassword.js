const req = require('../ApplicationRequest.js')

function resetDatabasePassword(internalId, databaseId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.postRequest('ResetDatabasePassword', internalId, databaseId)
}

module.exports = resetDatabasePassword