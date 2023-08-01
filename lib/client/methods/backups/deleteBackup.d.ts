/**
 * @param {String} serverId ID of the server
 */
declare function deleteBackup(serverId: string, backupId: string): Promise<any>;
export default deleteBackup;
