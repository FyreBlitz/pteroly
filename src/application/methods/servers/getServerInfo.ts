import req from "../../ApplicationRequest";

function getServerInfo(internalId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('GetServerInfo', internalId, null);
}

export default getServerInfo;