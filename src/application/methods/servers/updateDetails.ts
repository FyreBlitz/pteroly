import req from "../../ApplicationRequest";

/**
 * @param {Number} internalId The id of the server you want to update
 * @param {String} servername The servername
 * @param {Number} user The id of the server owner
 * @param {String} description The description of the server (optional)
 * @param {String} externalId The external id of the server (optional)
 * @yields Object (refer to docs for schema);
 */
function updateDetails(internalId: number, servername: string, user: number, description: string, externalId: string) {
	const data = makeData(servername, user, description, externalId)
	const Req  = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.patchRequest('UpdateDetails', data, internalId)
}

function makeData(servername: string, user: number, description: string, externalId: string) {
	return {
		"name":        servername,
		"user":        user,
		'description': description,
        'external_id': externalId
	}
}
export default updateDetails