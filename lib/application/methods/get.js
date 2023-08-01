"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../ApplicationRequest");
/**
 * @param {String} path The path of the request starting with "/"
 */
function get(path, page) {
    if (page === void 0) { page = 0; }
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.cGetRequest(path, page);
}
exports.default = get;
