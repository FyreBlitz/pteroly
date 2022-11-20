import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server RAM Usage of
 */
const getRAMUsage = (serverId: string): Promise<number> => {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.getRequest('GetMemoryUsage', serverId, null);
}

export default getRAMUsage;