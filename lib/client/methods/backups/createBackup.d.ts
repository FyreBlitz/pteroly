/**
 * @param {String} serverId ID of the server
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
declare function createBackup(serverId: string): Promise<returnType>;
export default createBackup;
