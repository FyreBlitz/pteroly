/**
 * @param {String} serverId ID of the server to get
 */
declare function getServerInfo(serverId: string): Promise<string>;
export default getServerInfo;
