import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server cores of
 */
function getDisk(serverId: string) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetDisk', serverId, null);
}

export default getDisk;