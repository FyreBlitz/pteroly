import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to get
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
}

interface returnType {
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

function serverDetails(serverId: string): Promise<returnType> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetServerInfo', serverId, null);
}

export default serverDetails;