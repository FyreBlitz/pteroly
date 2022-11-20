import req from "../../ClientRequest";

/**
 * @param {Number} page The page
 */

interface allocationType {
	"object": "allocation",
	"attributes": {
		"id": number,
		"ip": string,
		"ip_alias": null | string,
		"port": number,
		"notes": null | string,
		"is_default": boolean,
	},
};

interface returnType {
	"object": "server",
	"attributes": {
		"server_owner": boolean,
		"identifier": string,
		"uuid": string,
		"name": string,
		"node": string,
		"sftp_details": {
			"ip": string,
			"port": number,
		},
		"description": string,
		"limits": {
			"memory": number,
			"swap": number,
			"disk": number,
			"io": number,
			"cpu": number,
		},
		"feature_limits": {
			"databases": number,
			"allocations": number,
			"backups": number,
		},
		"is_suspended": boolean,
		"is_installing": boolean,
		"relationships": {
			"allocations": {
				"object": "list",
				"data": allocationType[]
			}
		}
	}
};

function listServers(page: number): Promise<returnType[]> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	if (page == -1) return Req.getRequest("ListServers", null, -1);
	return Req.getRequest("ListServers", null, page);
}

export default listServers;