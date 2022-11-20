import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to start
 */
function startServer(serverId: string): Promise<any> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	const data = { 'signal': 'start' };
	return Req.postRequest('StartServer', data, serverId);
}

export default startServer;