const req = require('../../ClientRequest.js');

/**
 * @param {String} serverId ID of the server to get
 */
function GetServerIPAlias(serverId) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY)
	return Req.getRequest('GetServerIPAlias', serverId)
}

module.exports = GetServerIPAlias