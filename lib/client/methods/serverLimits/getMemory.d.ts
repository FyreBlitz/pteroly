/**
 * @param {String} serverId ID of the server cores of
 */
declare function getMemory(serverId: string): Promise<number>;
export default getMemory;
