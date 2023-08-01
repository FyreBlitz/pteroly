/**
 * @param {String} serverId ID of the server to get
 */
declare function getServerIPAlias(serverId: string): Promise<string>;
export default getServerIPAlias;
