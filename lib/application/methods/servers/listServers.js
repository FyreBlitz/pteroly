"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 *
 * @param page The page for the Servers
 * @param showExtra Whether or not to show extra meta data (not supported when depaginating)
 * @returns
 */
function listServers(page, showExtra) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.getRequest('ListServers', showExtra, null, page);
}
exports.default = listServers;
