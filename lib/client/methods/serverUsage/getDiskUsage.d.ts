/**
 * @param {String} serverId ID of the server Disk Usage of
 */
declare function getDiskUsage(serverId: string): Promise<number>;
export default getDiskUsage;
