"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
;
function createDatabase(serverId, dbData) {
    var data = makeData(dbData);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateDatabase', data, serverId);
}
function makeData(dbData) {
    return {
        "database": dbData.name,
        "remote": dbData.remote,
        "host": dbData.host,
    };
}
exports.default = createDatabase;
