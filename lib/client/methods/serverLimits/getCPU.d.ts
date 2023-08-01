/**
 * @param {String} serverId ID of the server cores of
 */
declare function getCPU(serverId: string): Promise<number>;
export default getCPU;
