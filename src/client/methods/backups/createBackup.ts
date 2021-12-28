import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server
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

function createBackup(serverId: string): Promise<returnType> {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	return Req.postRequest('CreateBackup', {}, serverId);
}

export default createBackup;