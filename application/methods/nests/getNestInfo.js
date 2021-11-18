const req = require('../../ApplicationRequest.js')

function getNestInfo(nestId) {
	const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.getRequest('GetNestInfo', nestId)
}

module.exports = getNestInfo