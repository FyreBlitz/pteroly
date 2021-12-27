import req from "../../ApplicationRequest";

function getAllAllocations(nodeId: number, page: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	if (page != null) return Req.getRequest('GetAllAllocations', nodeId, page);
	return Req.getRequest('GetAllAllocations', nodeId, null);
}

export default getAllAllocations