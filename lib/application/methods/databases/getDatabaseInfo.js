"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
function getDatabaseInfo(internalId, databaseId) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.getRequest('GetDatabaseInfo', internalId, databaseId);
}
exports.default = getDatabaseInfo;
