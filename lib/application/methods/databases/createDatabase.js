"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 * @param {Integer} internalId Internal ID of the Server to create the Database
 * @param {String} name Name of the Database
 * @param {String} allowedIP IP allowed to connect, leave "%" if you dont want to restrict
 * @param {Integer} hostDBID ID of the Database Host
 */
function createDatabase(internalId, name, allowedIP, hostDBID) {
    var data = makeData(name, allowedIP, hostDBID);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateDatabase', data, internalId);
}
function makeData(name, allowedIP, hostDBID) {
    return {
        "database": name,
        "remote": allowedIP,
        "host": hostDBID,
    };
}
exports.default = createDatabase;
