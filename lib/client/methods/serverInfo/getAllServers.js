"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../../ClientRequest");
/**
 * @yields A Array of servers a application key has access to
 */
function getAllServers() {
    var Req = new ClientRequest_1.default(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
    return Req.getRequest('GetAllServers', null, null);
}
exports.default = getAllServers;
