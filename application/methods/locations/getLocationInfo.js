const req = require('../ApplicationRequest.js')

function getLocationInfo(locationId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetLocationInfo', locationId)
}

module.exports = getLocationInfo