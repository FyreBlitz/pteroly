const req = require('../ApplicationRequest.js')

function getAllNests() {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetAllNests', null)
}

module.exports = getAllNests