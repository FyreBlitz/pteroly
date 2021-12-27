import req from "../../ApplicationRequest";

/**
 * @param {Number} internalId Internal ID of the server to unsuspend
 */
function unSuspendServer(internalId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.postRequest('UnsuspendServer', null, internalId)
}

export default unSuspendServer