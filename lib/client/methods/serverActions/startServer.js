"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server to start
 */
function startServer(serverId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
    var data = { 'signal': 'start' };
    return Req.postRequest('StartServer', data, serverId);
}
exports.default = startServer;
