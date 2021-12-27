import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server
 */
function getAllBackups(serverId: string) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	return Req.getRequest('GetAllBackups', serverId, null);
}

export default getAllBackups;