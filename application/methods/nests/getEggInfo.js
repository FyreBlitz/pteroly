const req = require('../ApplicationRequest.js')

function getEggInfo(nestId, eggId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetEggInfo', nestId, eggId)
}

module.exports = getEggInfo