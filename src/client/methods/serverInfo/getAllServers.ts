import req from "../../ClientRequest";

/**
 * @yields A Array of servers a application key has access to
 */
function getAllServers() {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetAllServers', null, null);
}


export default getAllServers;