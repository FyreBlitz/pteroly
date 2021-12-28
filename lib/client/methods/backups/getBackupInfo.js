"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server
 * @param {String} backupId ID of the Backup
 */
function getBackupInfo(serverId, backupId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
    return Req.getRequest('GetBackupInfo', serverId, backupId);
}
exports.default = getBackupInfo;
