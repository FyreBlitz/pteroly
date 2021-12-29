import req from "../../ApplicationRequest";

/**
 * @param {String} locationId The location ID
 */

interface returnType {
	id: number,
	short: string,
	long: string,
	updated_at: string,
	created_at: string,
};

function locationDetails(locationId: number): Promise<returnType> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('LocationDetails', locationId, null);
}

export default locationDetails;