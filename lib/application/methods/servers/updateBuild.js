"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
;
;
function updateBuild(serverId, serverData) {
    var data = makeData(serverId, serverData);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.patchRequest('UpdateBuild', data, serverId);
}
function makeData(serverId, serverData) {
    return {
        "id": serverId,
        "allocation": serverData.allocation,
        'memory': serverData.memory,
        'swap': serverData.swap,
        'disk': serverData.disk,
        'io': serverData.io,
        'cpu': serverData.cpu,
        "threads": null,
        'feature_limits': {
            'databases': serverData.feature_limits.databases,
            'allocations': serverData.feature_limits.allocations,
            "backups": serverData.feature_limits.backups,
        },
    };
}
exports.default = updateBuild;
