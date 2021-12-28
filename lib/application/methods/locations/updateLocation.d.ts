/**
 * @param {Number} locationId The id of the location you want to update
 * @param {String} shortName The short name of your location
 * @param {String} longName The long name of your location
 * @yields Object (refer to docs for schema);
 */
declare function updateLocation(locationId: number, shortName: string, longName: string): Promise<any>;
export default updateLocation;
