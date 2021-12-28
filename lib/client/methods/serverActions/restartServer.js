"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server to restart
 */
function restartServer(serverId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
    var data = { 'signal': 'restart' };
    return Req.postRequest('RestartServer', data, serverId);
}
exports.default = restartServer;
