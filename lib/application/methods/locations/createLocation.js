"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
function createLocation(shortName, longName) {
    var data = makeData(shortName, longName);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateLocation', data, null);
}
function makeData(shortName, longName) {
    return {
        "short": shortName,
        "long": longName,
    };
}
exports.default = createLocation;
