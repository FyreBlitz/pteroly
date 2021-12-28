/**
 * @param {String} serverId ID of the server cores of
 */
declare function getDisk(serverId: string): Promise<number>;
export default getDisk;
