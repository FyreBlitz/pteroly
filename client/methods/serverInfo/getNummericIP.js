const req = require('../ClientRequest.js');

/**
 * @param {String} serverId ID of the server to get
 */
function GetNummericIP(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetNummericIP', serverId)
}

module.exports = GetNummericIP