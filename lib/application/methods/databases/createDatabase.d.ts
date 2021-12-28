/**
 * @param {Integer} internalId Internal ID of the Server to create the Database
 * @param {String} name Name of the Database
 * @param {String} allowedIP IP allowed to connect, leave "%" if you dont want to restrict
 * @param {Integer} hostDBID ID of the Database Host
 */
declare function createDatabase(internalId: number, name: string, allowedIP: string, hostDBID: number): Promise<any>;
export default createDatabase;
