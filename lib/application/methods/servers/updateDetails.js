"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
;
;
function updateDetails(serverId, serverDetails) {
    var data = makeData(serverDetails);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.patchRequest('UpdateDetails', data, serverId);
}
function makeData(serverDetails) {
    return {
        "name": serverDetails.name,
        "user": serverDetails.user,
        'description': serverDetails.description,
        'external_id': serverDetails.external_id,
    };
}
exports.default = updateDetails;
