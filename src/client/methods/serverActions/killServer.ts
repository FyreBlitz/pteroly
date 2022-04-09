import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to kill
 */

function killServer(serverId: string): Promise<any> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	const data = { 'signal': 'kill' };
	return Req.postRequest('KillServer', data, serverId);
}

export default killServer;