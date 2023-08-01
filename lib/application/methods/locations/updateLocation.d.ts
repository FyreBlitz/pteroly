/**
 * @param {Number} locationId The id of the location you want to update
 * @param {String} shortName The short name of your location
 * @param {String} longName The long name of your location
 */
interface returnType {
    id: number;
    short: string;
    long: string;
    updated_at: string;
    created_at: string;
}
declare function updateLocation(locationId: number, shortName: string, longName: string): Promise<returnType>;
export default updateLocation;
