"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientRequest_1 = require("../ClientRequest");
/**
 * @param {String} path The path of the request starting with "/"
 */
function del(path) {
    var Req = new ClientRequest_1.default(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
    return Req.cDeleteRequest(path);
}
exports.default = del;
