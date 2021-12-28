"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 * @param {Number} nodeId The node ID to get the details of.
 */
function getNode(nodeId) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.getRequest('GetNodeInfo', nodeId, null);
}
exports.default = getNode;
