import req from "../../ApplicationRequest";

/**
 * @param {Number} serverId Internal ID of the Server to create the Database
 * @param {Number} dbId The IP of the DB
 */

function deleteDatabase(serverId: number, dbId: number): Promise<any> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.deleteRequest('DeleteDatabases', serverId, dbId);
}

export default deleteDatabase;