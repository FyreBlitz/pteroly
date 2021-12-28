"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server
 */
function deleteBackup(serverId, backupId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
    return Req.deleteRequest('DeleteBackup', serverId, backupId);
}
exports.default = deleteBackup;
