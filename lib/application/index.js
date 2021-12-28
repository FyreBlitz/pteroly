"use strict";
var axios_1 = require("axios");
// Users
var createUser_1 = require("./methods/users/createUser");
var getAllUsers_1 = require("./methods/users/getAllUsers");
var getUserInfo_1 = require("./methods/users/getUserInfo");
var updateUser_1 = require("./methods/users/updateUser");
var deleteUser_1 = require("./methods/users/deleteUser");
// Servers
var createServer_1 = require("./methods/servers/createServer");
var getAllServers_1 = require("./methods/servers/getAllServers");
var updateBuild_1 = require("./methods/servers/updateBuild");
var updateDetails_1 = require("./methods/servers/updateDetails");
var deleteServer_1 = require("./methods/servers/deleteServer");
var suspendServer_1 = require("./methods/servers/suspendServer");
var unsuspendServer_1 = require("./methods/servers/unsuspendServer");
var getServerInfo_1 = require("./methods/servers/getServerInfo");
// Nodes
var createNode_1 = require("./methods/nodes/createNode");
var getNodeInfo_1 = require("./methods/nodes/getNodeInfo");
var getAllNodes_1 = require("./methods/nodes/getAllNodes");
var deleteNode_1 = require("./methods/nodes/deleteNode");
// Databases
var createDatabase_1 = require("./methods/databases/createDatabase");
var resetDatabasePassword_1 = require("./methods/databases/resetDatabasePassword");
var getAllDatabases_1 = require("./methods/databases/getAllDatabases");
var getDatabaseInfo_1 = require("./methods/databases/getDatabaseInfo");
var deleteDatabase_1 = require("./methods/databases/deleteDatabase");
// Allocations
var getAllAllocations_1 = require("./methods/allocations/getAllAllocations");
var deleteAllocation_1 = require("./methods/allocations/deleteAllocation");
var createAllocation_1 = require("./methods/allocations/createAllocation");
// Other
var post_1 = require("./methods/post");
var get_1 = require("./methods/get");
var put_1 = require("./methods/put");
var delete_1 = require("./methods/delete");
/**
 * @param {String} host Host to connect to
 * @param {String} key Key to use
 * @param {Boolean, String} callback Returns true when login is successful
 */
function login(host, key, callback) {
    host = host.trim();
    if (host.endsWith('/'))
        host = host.slice(0, -1);
    process.env.APPLICATION_PTEROLY_HOST = host;
    process.env.APPLICATION_PTEROLY_KEY = key;
    axios_1.default.get(host + '/api/application/users', {
        maxRedirects: 5,
        headers: {
            'Authorization': 'Bearer ' + key,
            'Content-Type': 'application/json',
            'Accept': 'Application/vnd.pterodactyl.v1+json',
        },
    }).then(function (response) {
        if (response.status == 404) {
            callback(false, 'API Key is not valid! (Application)');
        }
        else {
            callback(true);
        }
    }).catch(function (error) {
        if (error.response.status == 403) {
            callback(false, 'API Key is not valid! (Application)');
        }
        else {
            throw error;
        }
    });
}
/**
 *
 * @param {String} host The host to use
 * @param {String} key The application key to use
 * @Warning USE THIS ONLY IF YOU KNOW YOUR CREDENTIALS ARE 100% CORRECT, OR THEY NEVER CHANGE
 */
function fastLogin(host, key) {
    host = host.trim();
    if (host.endsWith('/'))
        host = host.slice(0, -1);
    process.env.APPLICATION_PTEROLY_HOST = host;
    process.env.APPLICATION_PTEROLY_KEY = key;
}
var functions = {
    login: login,
    fastLogin: fastLogin,
    // Users
    getUserInfo: getUserInfo_1.default,
    getAllUsers: getAllUsers_1.default,
    updateUser: updateUser_1.default,
    createUser: createUser_1.default,
    deleteUser: deleteUser_1.default,
    // Servers
    getServerInfo: getServerInfo_1.default,
    getAllServers: getAllServers_1.default,
    createServer: createServer_1.default,
    suspendServer: suspendServer_1.default,
    unsuspendServer: unsuspendServer_1.default,
    updateBuild: updateBuild_1.default,
    updateDetails: updateDetails_1.default,
    deleteServer: deleteServer_1.default,
    // Nodes
    getNodeInfo: getNodeInfo_1.default,
    getAllNodes: getAllNodes_1.default,
    createNode: createNode_1.default,
    createAllocation: createAllocation_1.default,
    deleteNode: deleteNode_1.default,
    // Database
    getAllDatabases: getAllDatabases_1.default,
    getDatabaseInfo: getDatabaseInfo_1.default,
    createDatabase: createDatabase_1.default,
    resetDatabasePassword: resetDatabasePassword_1.default,
    deleteDatabase: deleteDatabase_1.default,
    // Allocations
    getAllAllocations: getAllAllocations_1.default,
    deleteAllocation: deleteAllocation_1.default,
    // Other
    post: post_1.default,
    get: get_1.default,
    put: put_1.default,
    delete: delete_1.default,
};
module.exports = functions;
