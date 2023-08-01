"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../ClientRequest");
/**
 * @param {String} path The path of the request
 * @param {String} body The body
 */
function patch(path, body) {
    var Req = new ClientRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.cPatchRequest(path, body);
}
exports.default = patch;
