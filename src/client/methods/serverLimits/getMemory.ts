import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server cores of
 */
function getMemory(serverId: string) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetMemory', serverId, null);
}

export default getMemory;