import req from "../../ApplicationRequest";

/**
 * @param {Number} serverId Internal ID of the Server to create the Database
 * @param {Number} dbId The IP of the DB
 */

interface returnType {
	"object": "server_database",
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
		"relationships": {
			"password": {
				"object": "database_password",
				"attributes": {
					"password": string,
				},
			},
			"host": {
				"object": "database_host",
				"attributes": {
					"id": number,
					"name": string,
					"host": string,
					"port": number,
					"username": string,
					"node": number,
					"created_at": string,
					"updated_at": string,
				},
			},
		},
	}
}

function listDatabases(serverId: number, page: number): Promise<returnType[]> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('ListDatabases', serverId, null, page);
}

export default listDatabases;