import req from "../../ApplicationRequest";

function getNestInfo(nestId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('GetNestInfo', nestId, null);
}

export default getNestInfo