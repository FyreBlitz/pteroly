import req from "../../ApplicationRequest";

function getLocationInfo(locationId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('GetLocationInfo', locationId, null);
}

export default getLocationInfo;