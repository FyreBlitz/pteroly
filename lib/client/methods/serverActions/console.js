"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @param {String} serverId ID of the server to connect to the console
 */
function console(serverId) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
    // return Req.websocket('Console', serverId)
    return 'THIS FEATURE IS STILL IN DEVELOPMENT';
}
exports.default = console;
