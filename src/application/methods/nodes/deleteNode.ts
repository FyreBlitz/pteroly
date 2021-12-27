import req from "../../ApplicationRequest";

/**
 *
 * @param {String} nodeId The node ID to delete
 */
function deleteNode(nodeId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.deleteRequest('DeleteNode', nodeId, null);
}

export default deleteNode;