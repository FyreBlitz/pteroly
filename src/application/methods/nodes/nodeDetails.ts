import req from "../../ApplicationRequest";

/**
 * @param {Number} nodeId The node ID to get the details of.
 */

type webType = "https" | "http";
interface returnType {
	id: number,
	uuid: string,
	public: boolean,
	name: string,
	description: string,
	location_id: number,
	fqdn: string,
	scheme: webType,
	behind_proxy: boolean,
	maintenance_mode: boolean,
	memory: number,
	memory_overallocate: number,
	disk: number,
	disk_overallocate: number,
	allocated_resources: {
		memory: number,
		disk: number,
	},
	upload_size: number,
	daemon_listen: number,
	daemon_sftp: number,
	daemon_base: string,
	created_at: string,
	updated_at: string,
};

function nodeDetails(nodeId: number): Promise<returnType> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetNodeInfo', nodeId, null);
}

export default nodeDetails;