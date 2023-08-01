"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
;
;
function createNode(nodeInfo) {
    var data = makeData(nodeInfo);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateNode', data, null);
}
function makeData(nodeInfo) {
    return {
        'name': nodeInfo.name,
        'description': nodeInfo.description,
        'location_id': nodeInfo.location_id,
        'public': nodeInfo.public,
        'fqdn': nodeInfo.fqdn,
        'scheme': nodeInfo.scheme,
        'behind_proxy': nodeInfo.behind_proxy,
        'memory': nodeInfo.memory,
        'memory_overallocate': nodeInfo.memory_overallocate,
        'disk': nodeInfo.disk,
        'disk_overallocate': nodeInfo.disk_overallocate,
        'daemon_base': nodeInfo.daemon_base,
        'daemon_listen': nodeInfo.daemon_listen,
        'daemon_sftp': nodeInfo.daemon_sftp,
        'maintenance_mode': nodeInfo.maintenance_mode,
        'upload_size': nodeInfo.upload_size,
    };
}
exports.default = createNode;
