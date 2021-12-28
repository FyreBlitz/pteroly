"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server
 */
function downloadBackup(serverId, backupId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
    return 'THIS FEATURE IS CURRENTLY UNDER DEVELOPMENT'; // Req.getRequest('DownloadBackup', serverId, backupId)
}
exports.default = downloadBackup;
