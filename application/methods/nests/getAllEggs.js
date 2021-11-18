const req = require('../../ApplicationRequest.js')

function getAllEggs(nestId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetAllEggs', nestId)
}

module.exports = getAllEggs