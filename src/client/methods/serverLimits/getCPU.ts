import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server cores of
 */
function getCPU(serverId: string): Promise<number> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetCPU', serverId, null);
}

export default getCPU;