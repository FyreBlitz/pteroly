import req from "../../ApplicationRequest";

function getEggInfo(nestId: number, eggId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('GetEggInfo', nestId, eggId)
}

export default getEggInfo