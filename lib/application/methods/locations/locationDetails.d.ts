/**
 * @param {String} locationId The location ID
 */
interface returnType {
    id: number;
    short: string;
    long: string;
    updated_at: string;
    created_at: string;
}
declare function locationDetails(locationId: number): Promise<returnType>;
export default locationDetails;
