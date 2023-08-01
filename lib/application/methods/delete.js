"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../ApplicationRequest");
/**
 * @param {String} path The path of the request starting with "/"
 */
function del(path) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.cDeleteRequest(path);
}
exports.default = del;
