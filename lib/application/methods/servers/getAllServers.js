"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
function getAllServers(page) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    if (page != undefined)
        return Req.getRequest('GetAllServers', null, page);
    return Req.getRequest('GetAllServers', null, null);
}
exports.default = getAllServers;
