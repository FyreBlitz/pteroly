"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 * @param {Number} internalId The id of the server you want to update
 * @param {String} servername The servername
 * @param {Number} user The id of the server owner
 * @param {String} description The description of the server (optional)
 * @param {String} externalId The external id of the server (optional)
 * @yields Object (refer to docs for schema);
 */
function updateDetails(internalId, servername, user, description, externalId) {
    var data = makeData(servername, user, description, externalId);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.patchRequest('UpdateDetails', data, internalId);
}
function makeData(servername, user, description, externalId) {
    return {
        "name": servername,
        "user": user,
        'description': description,
        'external_id': externalId
    };
}
exports.default = updateDetails;
