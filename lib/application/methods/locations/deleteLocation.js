"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 * @param {String} locationId The location ID to delete
 */
function deleteLocation(locationId) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.deleteRequest('DeleteLocation', locationId, null);
}
exports.default = deleteLocation;
