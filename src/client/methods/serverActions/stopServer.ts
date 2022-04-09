import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to stop
 */
function stopServer(serverId: string): Promise<any> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	const data = { 'signal': 'stop' };
	return Req.postRequest('StopServer', data, serverId);
}

export default stopServer;