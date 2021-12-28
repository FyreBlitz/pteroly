"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 * @param {Number} nodeId The id of the nodes you want to add am allocation to
 * @param {String} ip The ip of the new allocation
 * @param {Array} ports The ports you want to add to the node
 * @yields Object (refer to docs for schema);
 */
function createAllocation(nodeId, ip, ports) {
    var data = makeData(ip, ports);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateAllocation', data, nodeId);
}
function makeData(ip, ports) {
    return {
        "ip": ip,
        "ports": ports
    };
}
exports.default = createAllocation;
