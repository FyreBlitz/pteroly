import req from "../../ApplicationRequest";

function getAllServers(page: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	if (page != undefined) return Req.getRequest('GetAllServers', null, page)
	return Req.getRequest('GetAllServers', null, null);
}

export default getAllServers;