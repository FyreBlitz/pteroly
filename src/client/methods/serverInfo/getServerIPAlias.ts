import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to get
 */
function getServerIPAlias(serverId: string): Promise<string> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetServerIPAlias', serverId, null);
}

export default getServerIPAlias;