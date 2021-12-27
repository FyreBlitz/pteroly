import req from "../../ApplicationRequest";

/**
 * @param {String} locationId The location ID to delete
 */
function deleteLocation(locationId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.deleteRequest('DeleteLocation', locationId, null);
}

export default deleteLocation;