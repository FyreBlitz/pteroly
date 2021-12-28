"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../ClientRequest");
/**
 * @param {String} path The path of the request
 * @param {String} body The body
 */
function post(path, body) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
    return Req.cPostRequest(path, body);
}
exports.default = post;
