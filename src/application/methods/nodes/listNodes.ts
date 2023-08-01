import req from "../../ApplicationRequest";

type webType = "https" | "http";
interface returnType {
	object: "node",
	attributes: {
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
		allocated_resources: {
			memory: number,
			disk: number,
		},
		disk: number,
		disk_overallocate: number,
		upload_size: number,
		daemon_listen: number,
		daemon_sftp: number,
		daemon_base: string,
		created_at: string,
		updated_at: string,
	}
};

function listNodes(page: number): Promise<returnType[]> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('ListNodes', null, null, page);
}

export default listNodes;