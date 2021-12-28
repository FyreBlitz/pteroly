import req from "../../ApplicationRequest";

/**
 * @param {Number} serverId The id of the server you want to update
 * @param {serverDetails} serverDetails The new details of the server
 */

interface serverDetails {
	name: string,
	description: string,
	user: number,
	external_id: null | string,
};

interface databaseType {
	"object": "allocation",
	"attributes": {
		"id": number,
		"server": number,
		"host": number,
		"database": string,
		"username": string,
		"remote": string,
		"max_connections": number,
		"created_at": string,
		"updated_at": string,
	},
}

interface returnType {
	"id": number,
	"external_id": string,
	"uuid": string,
	"identifier": string,
	"name": string,
	"description": string,
	"suspended": boolean,
	"limits": {
		"memory": number,
		"swap": number,
		"disk": number,
		"io": number,
		"cpu": number,
		"threads": any | null,
	},
	"feature_limits": {
		"databases": number,
		"allocations": number,
		"backups": number,
	},
	"user": number,
	"node": number,
	"allocation": number,
	"nest": number,
	"egg": number,
	"pack": any | null,
	"container": {
		"startup_command": string,
		"image": string,
		"installed": boolean,
		"environment": {
			"SERVER_JARFILE": string,
			"VANILLA_VERSION": string,
			"STARTUP": string,
			"P_SERVER_LOCATION": string,
			"P_SERVER_UUID": string,
		}
	},
	"updated_at": string,
	"created_at":  string,
	"relationships": {
		"databases": {
			"object": string,
			"data": databaseType[],
		},
	}
};

function updateDetails(serverId: number, serverDetails: serverDetails): Promise<returnType> {
	const data = makeData(serverDetails);
	const Req  = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.patchRequest('UpdateDetails', data, serverId);
}

function makeData(serverDetails: serverDetails) {
	return {
		"name":        serverDetails.name,
		"user":        serverDetails.user,
		'description': serverDetails.description,
        'external_id': serverDetails.external_id,
	};
}
export default updateDetails;