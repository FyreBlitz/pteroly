import req from "../../ApplicationRequest";

function getAllLocations() {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetAllLocations', null, null);
}

export default getAllLocations;