"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
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
function createNode(name, description, locationId, isPublic, fqdn, scheme, behindProxy, memory, disk, memoryOverallocate, diskOverallocate, daemonDir, daemonPort, daemonSftpPort, maintenanceMode, uploadSize) {
    var data = makeData(name, description, locationId, isPublic, fqdn, scheme, behindProxy, memory, disk, memoryOverallocate, diskOverallocate, daemonDir, daemonPort, daemonSftpPort, maintenanceMode, uploadSize);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateNode', data, null);
}
function makeData(name, description, locationId, isPublic, fqdn, scheme, behindProxy, memory, disk, memoryOverallocate, diskOverallocate, daemonDir, daemonPort, daemonSftpPort, maintenanceMode, uploadSize) {
    return {
        'name': name,
        'description': description,
        'location_id': locationId,
        'public': isPublic,
        'fqdn': fqdn,
        'scheme': scheme,
        'behind_proxy': behindProxy,
        'memory': memory,
        'memory_overallocate': memoryOverallocate,
        'disk': disk,
        'disk_overallocate': diskOverallocate,
        'daemon_base': daemonDir,
        'daemon_listen': daemonPort,
        'daemon_sftp': daemonSftpPort,
        'maintenance_mode': maintenanceMode,
        'upload_size': uploadSize,
    };
}
exports.default = createNode;
