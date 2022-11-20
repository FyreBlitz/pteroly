import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to restart
 */
function restartServer(serverId: string): Promise<any> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	const data = { 'signal': 'restart' };
	return Req.postRequest('RestartServer', data, serverId);
}

export default restartServer;