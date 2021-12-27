import req from "../../ApplicationRequest";

function getAllDatabases(internalId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetAllDatabases', internalId, null);
}

export default getAllDatabases;