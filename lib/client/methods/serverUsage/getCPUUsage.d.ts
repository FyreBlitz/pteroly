/**
 * @param {String} serverId ID of the server CPU Usage of
 */
declare function getCPUUsage(serverId: string): Promise<number>;
export default getCPUUsage;
