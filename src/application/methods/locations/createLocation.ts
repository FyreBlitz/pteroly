import req from "../../ApplicationRequest";

/**
 * @param {String} shortName The short name of your location
 * @param {String} longName The long name of your location
 */

interface returnType {
	id: number,
	short: string,
	long: string,
	updated_at: string,
	created_at: string,
}

function createLocation(shortName: string, longName: string): Promise<returnType> {
	const data = makeData(shortName, longName);
	const Req  = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.postRequest('CreateLocation', data, null);
}

function makeData(shortName: string, longName: string) {
	return {
        "short": shortName,
        "long":  longName,
	}
}

export default createLocation;