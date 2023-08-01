"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRequest_1 = require("../../ApplicationRequest");
function createUser(userData) {
    var Req = new ApplicationRequest_1.default(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    var data = createData(userData);
    return Req.postRequest('CreateUser', data, null);
}
function createData(userData) {
    return {
        'username': userData.username,
        'email': userData.email,
        'password': userData.password,
        'first_name': userData.first_name,
        'last_name': userData.last_name,
        'root_admin': userData.root_admin,
        'language': userData.language,
    };
}
exports.default = createUser;
