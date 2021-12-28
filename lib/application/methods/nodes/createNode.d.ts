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
declare function createNode(name: string, description: string, locationId: number, isPublic: boolean, fqdn: string, scheme: string, behindProxy: boolean, memory: number, disk: number, memoryOverallocate: number, diskOverallocate: number, daemonDir: string, daemonPort: number, daemonSftpPort: number, maintenanceMode: boolean, uploadSize: number): Promise<any>;
export default createNode;
