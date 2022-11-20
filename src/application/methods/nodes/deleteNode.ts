import req from "../../ApplicationRequest";

/**
 *
 * @param {Number} nodeId The id of the Node
 */

function deleteNode(nodeId: number): Promise<any> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.deleteRequest('DeleteNode', nodeId, null);
}

export default deleteNode;