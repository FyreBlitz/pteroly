/**
 * @param {Number} internalId The id of the server you want to update
 * @param {String} servername The servername
 * @param {Number} user The id of the server owner
 * @param {String} description The description of the server (optional)
 * @param {String} externalId The external id of the server (optional)
 * @yields Object (refer to docs for schema);
 */
declare function updateDetails(internalId: number, servername: string, user: number, description: string, externalId: string): Promise<any>;
export default updateDetails;
