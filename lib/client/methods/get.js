"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../ClientRequest");
/**
 * @param {String} path The path of the request
 */
function get(path) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
    return Req.cGetRequest(path);
}
exports.default = get;
