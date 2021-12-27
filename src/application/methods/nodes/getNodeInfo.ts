import req from "../../ApplicationRequest";

/**
 * @param {Number} nodeId The node ID to get the details of.
 */
function getNode(nodeId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetNodeInfo', nodeId, null);
}

export default getNode;