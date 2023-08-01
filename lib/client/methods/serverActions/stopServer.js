"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server to stop
 */
function stopServer(serverId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
    var data = { 'signal': 'stop' };
    return Req.postRequest('StopServer', data, serverId);
}
exports.default = stopServer;
