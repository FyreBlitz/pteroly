import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server status to get
 */
function getServerStatus(serverId: string) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetServerStatus', serverId, null);
}

export default getServerStatus;