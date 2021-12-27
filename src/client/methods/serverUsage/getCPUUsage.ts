import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server CPU Usage of
 */
function getCPUUsage(serverId: string) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetCPUUsage', serverId, null);
}

export default getCPUUsage;