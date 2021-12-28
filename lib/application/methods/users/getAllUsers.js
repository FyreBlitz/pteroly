"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
/**
 * @param {Integer} page Specify a page, leave blank if you dont want to paginate
*/
function getAllUsers(page) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    if (page !== undefined)
        return Req.getRequest('GetAllUsers', page, null);
    return Req.getRequest('GetAllUsers', null, null);
}
exports.default = getAllUsers;
