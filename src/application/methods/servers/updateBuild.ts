import req from "../../ApplicationRequest";

/**
 * @param {Number} serverId The id of the server you want to update
 * @param {serverData} serverData The data of the Server
 */

interface serverData {
	allocation: number,
	cpu: number,
	memory: number,
	disk: number,
	io: number,
	swap: number,
	feature_limits: {
		databases: number,
		allocations: number,
		backups: number,
	},
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

function updateBuild(serverId: number, serverData: serverData): Promise<returnType> {
	const data = makeData(serverId, serverData);
	const Req  = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.patchRequest('UpdateBuild', data, serverId);
}

function makeData(serverId: number, serverData: serverData) {
	return {
		"id": serverId,
		"allocation": serverData.allocation,
		'memory': serverData.memory,
		'swap': serverData.swap,
		'disk': serverData.disk,
		'io': serverData.io,
		'cpu': serverData.cpu,
		"threads": null,
		'feature_limits': {
			'databases': serverData.feature_limits.databases,
			'allocations': serverData.feature_limits.allocations,
			"backups": serverData.feature_limits.backups,
		},
	};
}

export default updateBuild;