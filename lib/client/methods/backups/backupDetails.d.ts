/**
 * @param {String} serverId ID of the server
 * @param {String} backupId ID of the Backup
 */
interface returnType {
    uuid: string;
    name: string;
    ignored_files: Array<string>;
    sha256_hash: string;
    bytes: number;
    created_at: string;
    completed_at: string;
}
declare function backupDetails(serverId: string, backupId: string): Promise<returnType>;
export default backupDetails;
