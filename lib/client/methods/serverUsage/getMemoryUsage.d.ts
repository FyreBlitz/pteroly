/**
 * @param {String} serverId ID of the server RAM Usage of
 */
declare const getRAMUsage: (serverId: string) => Promise<number>;
export default getRAMUsage;
