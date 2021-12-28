"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server Disk Usage of
 */
function getDiskUsage(serverId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
    return Req.getRequest('GetDiskUsage', serverId, null);
}
exports.default = getDiskUsage;
