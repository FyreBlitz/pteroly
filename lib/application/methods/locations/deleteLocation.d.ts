/**
 * @param {String} locationId The location ID to delete
 */
declare function deleteLocation(locationId: number): Promise<void | {
    success: boolean;
    message: string;
}>;
export default deleteLocation;
