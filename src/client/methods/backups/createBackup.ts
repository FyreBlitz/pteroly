import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server
 */
function createBackup(serverId: string) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	return Req.postRequest('CreateBackup', {}, serverId);
}

export default createBackup;