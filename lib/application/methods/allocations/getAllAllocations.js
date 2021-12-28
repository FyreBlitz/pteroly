"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
function getAllAllocations(nodeId, page) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    if (page != null)
        return Req.getRequest('GetAllAllocations', nodeId, page);
    return Req.getRequest('GetAllAllocations', nodeId, null);
}
exports.default = getAllAllocations;
