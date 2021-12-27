import req from "../../ApplicationRequest";

/**
 *
 * @param {String} internalId Internal ID of the server to delete
 */
function deleteServer(internalId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.deleteRequest('DeleteServer', internalId, null)
}

export default deleteServer;