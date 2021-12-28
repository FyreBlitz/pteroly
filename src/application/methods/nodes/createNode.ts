import req from "../../ApplicationRequest";

/**
 *
 * @param {nodeData} nodeInfo The data of the Node
 */


 type webType = "https" | "http";
 interface nodeData {
	name: string,
	description: "" | string,
	location_id: 1 | number,
	fqdn: string,
	scheme: webType,
	behind_proxy: false | boolean,
	maintenance_mode: false | boolean,
	memory: number,
	memory_overallocate: 0 | number,
	disk: number,
	disk_overallocate: 0 | number,
	upload_size: 100 | number,
	daemon_sftp: 2022 | number,
	daemon_listen: 8080 | number,
	public: true | boolean,
	daemon_base: string,
};
 
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
	 upload_size: number,
	 daemon_listen: number,
	 daemon_sftp: number,
	 daemon_base: string,
	 created_at: string,
	 updated_at: string,
	 mounts: any[],
	 allocated_resources: {
		 memory: number,
		 disk: number,
	 }
 };

function createNode(nodeInfo: nodeData): Promise<returnType> {
	const data = makeData(nodeInfo)
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.postRequest('CreateNode', data, null)
}

function makeData(nodeInfo: nodeData) {
	return {
		'name': nodeInfo.name,
		'description': nodeInfo.description,
		'location_id': nodeInfo.location_id,
		'public': nodeInfo.public,
		'fqdn': nodeInfo.fqdn,
		'scheme': nodeInfo.scheme,
		'behind_proxy': nodeInfo.behind_proxy,
		'memory': nodeInfo.memory,
		'memory_overallocate': nodeInfo.memory_overallocate,
		'disk': nodeInfo.disk,
		'disk_overallocate': nodeInfo.disk_overallocate,
		'daemon_base': nodeInfo.daemon_base,
		'daemon_listen': nodeInfo.daemon_listen,
		'daemon_sftp': nodeInfo.daemon_sftp,
		'maintenance_mode': nodeInfo.maintenance_mode,
		'upload_size': nodeInfo.upload_size,
	}
}

export default createNode