import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server
 */
function downloadBackup(serverId: string, backupId: string) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	return 'THIS FEATURE IS CURRENTLY UNDER DEVELOPMENT'; // Req.getRequest('DownloadBackup', serverId, backupId)
}

export default downloadBackup;