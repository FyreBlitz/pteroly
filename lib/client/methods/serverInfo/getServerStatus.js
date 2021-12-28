"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server status to get
 */
function getServerStatus(serverId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
    return Req.getRequest('GetServerStatus', serverId, null);
}
exports.default = getServerStatus;
