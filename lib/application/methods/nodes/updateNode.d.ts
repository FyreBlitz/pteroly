/**
 *
 * @param {String} name The name of the node
 * @param {String} description A description for the node
 * @param {String} locationId Location ID to use
 * @param {Boolean} public Is this node public? (true/false)
 * @param {String} fqdn Fully Qualified Domain Name (If you're using an IP: Scheme needs to be HTTP)
 * @param {String} scheme HTTP/HTTPS
 * @param {Boolean} behindProxy Is this node behind a proxy? (true/false)
 * @param {String} memory How much RAM should be allocated for the node?
 * @param {String} memoryOverallocate How much overallocation for RAM? (Percent)
 * @param {String} disk How much disk space be allocated for the node?
 * @param {String} diskOverallocate How much overallocation for the Disk? (percent)
 * @param {String} daemonDir Directory of the daemon, normally /srv/daemon
 * @param {String} daemonPort What port should the daemon use? Normally 8080
 * @param {String} daemonSftpPort What port should the daemon use? Normally 2022
 * @param {Boolean} maintenanceMode Is the node in maintence mode? (true/false)
 * @param {BigInteger} upload_size Must be between 1 and 1024 or you'll get a 422
 */
type webType = "https" | "http";
interface nodeData {
    name: string;
    description: "" | string;
    location_id: 1 | number;
    fqdn: string;
    scheme: webType;
    behind_proxy: false | boolean;
    maintenance_mode: false | boolean;
    memory: number;
    memory_overallocate: 0 | number;
    disk: number;
    disk_overallocate: 0 | number;
    upload_size: 100 | number;
    daemon_sftp: 2022 | number;
    daemon_listen: 8080 | number;
    public: true | boolean;
    daemon_base: string;
}
interface returnType {
    id: number;
    uuid: string;
    public: boolean;
    name: string;
    description: string;
    location_id: number;
    fqdn: string;
    scheme: webType;
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_base: string;
    created_at: string;
    updated_at: string;
    mounts: any[];
    allocated_resources: {
        memory: number;
        disk: number;
    };
}
declare function updateNode(nodeInfo: nodeData): Promise<returnType>;
export default updateNode;
