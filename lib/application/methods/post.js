"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../ApplicationRequest");
/**
 * @param {String} path The path of the request starting with "/"
 */
function post(path, body) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.cPostRequest(path, body);
}
exports.default = post;
