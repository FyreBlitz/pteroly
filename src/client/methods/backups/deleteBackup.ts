import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server
 */
function deleteBackup(serverId: string, backupId: string) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	return Req.deleteRequest('DeleteBackup', serverId, backupId);
}

export default deleteBackup;