import req from "../../ApplicationRequest";

/**
 * @param {Number} locationId The id of the location you want to update
 * @param {String} shortName The short name of your location
 * @param {String} longName The long name of your location
 * @yields Object (refer to docs for schema);
 */
function updateLocation(locationId: number, shortName: string, longName: string) {
	const data = makeData(shortName, longName);
	const Req  = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.patchRequest('UpdateLocation', data, locationId);
}

function makeData(shortName: string, longName: string) {
	return {
        "short": shortName,
        "long":  longName,
	}
}
export default updateLocation;