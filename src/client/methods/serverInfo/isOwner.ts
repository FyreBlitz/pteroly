import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to check owner value of
 */
function isOwner(serverId: string) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('IsOwner', serverId, null);
}

export default isOwner;