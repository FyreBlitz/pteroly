import req from "../../ApplicationRequest";

function getAllNests() {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('GetAllNests', null, null);
}

export default getAllNests