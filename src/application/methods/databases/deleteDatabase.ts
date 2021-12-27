import req from "../../ApplicationRequest";

function deleteDatabase(internalId: number, databaseId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.deleteRequest('DeleteDatabases', internalId, databaseId);
}

export default deleteDatabase;