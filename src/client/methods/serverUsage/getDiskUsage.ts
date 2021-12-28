import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server Disk Usage of
 */
function getDiskUsage(serverId: string): Promise<number> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetDiskUsage', serverId, null);
}

export default getDiskUsage