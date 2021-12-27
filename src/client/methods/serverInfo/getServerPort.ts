import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to get
 */
function getServerPort(serverId: string) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetServerPort', serverId, null);
}

export default getServerPort;