/**
 * @param {String} serverId ID of the server
 */
interface returnType {
    object: "backup";
    attributes: {
        uuid: string;
        name: string;
        ignored_files: Array<string>;
        sha256_hash: string;
        bytes: number;
        created_at: string;
        completed_at: string;
    };
}
declare function listBackups(serverId: string): Promise<returnType>;
export default listBackups;
