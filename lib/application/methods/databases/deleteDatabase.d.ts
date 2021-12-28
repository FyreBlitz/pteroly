/**
 * @param {Number} serverId Internal ID of the Server to create the Database
 * @param {Number} dbId The IP of the DB
 */
declare function deleteDatabase(serverId: number, dbId: number): Promise<any>;
export default deleteDatabase;
