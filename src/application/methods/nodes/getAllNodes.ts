import req from "../../ApplicationRequest";

function getAllNodes() {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetAllNodes', null, null);
}

export default getAllNodes;