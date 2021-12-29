import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server
 */

interface returnType {
	object: "backup",
	attributes: {
		uuid: string,
		name: string,
		ignored_files: Array<string>,
		sha256_hash: string,
		bytes: number,
		created_at: string,
		completed_at: string,
	}
}

function listBackups(serverId: string): Promise<returnType> {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	return Req.getRequest('ListBackups', serverId, null);
}

export default listBackups;