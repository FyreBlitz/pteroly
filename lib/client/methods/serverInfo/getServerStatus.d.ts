/**
 * @param {String} serverId ID of the server status to get
 */
declare function getServerStatus(serverId: string): Promise<string>;
export default getServerStatus;
