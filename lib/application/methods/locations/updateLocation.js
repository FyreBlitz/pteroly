"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 * @param {Number} locationId The id of the location you want to update
 * @param {String} shortName The short name of your location
 * @param {String} longName The long name of your location
 * @yields Object (refer to docs for schema);
 */
function updateLocation(locationId, shortName, longName) {
    var data = makeData(shortName, longName);
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.patchRequest('UpdateLocation', data, locationId);
}
function makeData(shortName, longName) {
    return {
        "short": shortName,
        "long": longName,
    };
}
exports.default = updateLocation;
