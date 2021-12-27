import req from "../../ApplicationRequest";

function getDatabaseInfo(internalId: number, databaseId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetDatabaseInfo', internalId, databaseId);
}

export default getDatabaseInfo