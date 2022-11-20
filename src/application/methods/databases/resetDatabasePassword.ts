import req from "../../ApplicationRequest";

function resetDatabasePassword(internalId: number, databaseId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.postRequest('ResetDatabasePassword', internalId, databaseId);
}

export default resetDatabasePassword;