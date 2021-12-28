"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 *
 * @param {String} nodeId The node ID to delete
 */
function deleteNode(nodeId) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.deleteRequest('DeleteNode', nodeId, null);
}
exports.default = deleteNode;
