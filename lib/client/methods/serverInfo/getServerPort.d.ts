/**
 * @param {String} serverId ID of the server to get
 */
declare function getServerPort(serverId: string): Promise<number>;
export default getServerPort;
