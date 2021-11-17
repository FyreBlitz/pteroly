const req = require('../../ApplicationRequest.js')

/**
 * @param {String} locationId The location ID to delete
 */
function deleteLocation(locationId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.deleteRequest('DeleteLocation', locationId)
}

module.exports = deleteLocation