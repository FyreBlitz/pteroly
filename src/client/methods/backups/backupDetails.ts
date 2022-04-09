import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server
 * @param {String} backupId ID of the Backup
 */

interface returnType {
	uuid: string,
	name: string,
	ignored_files: Array<string>,
	sha256_hash: string,
	bytes: number,
	created_at: string,
	completed_at: string,
}

function backupDetails(serverId: string, backupId: string): Promise<returnType> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('BackupDetails', serverId, backupId);
}

export default backupDetails;