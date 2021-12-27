import req from "../../ApplicationRequest";

/**
 * @param {Number} internalId Internal ID of the server to suspend
 */
function suspendServer(internalId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.postRequest('SuspendServer', null, internalId)
}

export default suspendServer