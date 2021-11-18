const req = require('../../ApplicationRequest.js')

function getAllLocations() {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetAllLocations', null)
}

module.exports = getAllLocations