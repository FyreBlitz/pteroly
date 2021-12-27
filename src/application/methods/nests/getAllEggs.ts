import req from "../../ApplicationRequest";

function getAllEggs(nestId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('GetAllEggs', nestId, null);
}

export default getAllEggs;