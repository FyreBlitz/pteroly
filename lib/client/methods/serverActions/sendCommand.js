"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server to send a command to
 * @param {String} command Command to send
 */
function sendCommand(serverId, command) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
    var data = { 'command': command };
    return Req.postRequest('SendCommand', data, serverId);
}
exports.default = sendCommand;
