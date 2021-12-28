"use strict";
var axios_1 = require("axios");
// Users
var createUser_1 = require("./methods/users/createUser");
var listUsers_1 = require("./methods/users/listUsers");
var userDetails_1 = require("./methods/users/userDetails");
var userQuery_1 = require("./methods/users/userQuery");
var updateUser_1 = require("./methods/users/updateUser");
var deleteUser_1 = require("./methods/users/deleteUser");
// Servers
var createServer_1 = require("./methods/servers/createServer");
var listServers_1 = require("./methods/servers/listServers");
var updateBuild_1 = require("./methods/servers/updateBuild");
var updateDetails_1 = require("./methods/servers/updateDetails");
var deleteServer_1 = require("./methods/servers/deleteServer");
var suspendServer_1 = require("./methods/servers/suspendServer");
var unsuspendServer_1 = require("./methods/servers/unsuspendServer");
var serverDetails_1 = require("./methods/servers/serverDetails");
// Nodes
var createNode_1 = require("./methods/nodes/createNode");
var nodeDetails_1 = require("./methods/nodes/nodeDetails");
var listNodes_1 = require("./methods/nodes/listNodes");
var deleteNode_1 = require("./methods/nodes/deleteNode");
// Databases
var createDatabase_1 = require("./methods/databases/createDatabase");
var resetDatabasePassword_1 = require("./methods/databases/resetDatabasePassword");
var listDatabases_1 = require("./methods/databases/listDatabases");
var databaseDetails_1 = require("./methods/databases/databaseDetails");
var deleteDatabase_1 = require("./methods/databases/deleteDatabase");
// Allocations
var listAllocations_1 = require("./methods/allocations/listAllocations");
var deleteAllocation_1 = require("./methods/allocations/deleteAllocation");
var createAllocation_1 = require("./methods/allocations/createAllocation");
// Locations
var listLocations_1 = require("./methods/locations/listLocations");
var deleteLocation_1 = require("./methods/locations/deleteLocation");
var createLocation_1 = require("./methods/locations/createLocation");
var updateLocation_1 = require("./methods/locations/updateLocation");
var locationDetails_1 = require("./methods/locations/locationDetails");
// Other
var post_1 = require("./methods/post");
var patch_1 = require("./methods/patch");
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
    userDetails: userDetails_1.default,
    listUsers: listUsers_1.default,
    updateUser: updateUser_1.default,
    createUser: createUser_1.default,
    deleteUser: deleteUser_1.default,
    userQuery: userQuery_1.default,
    // Servers
    serverDetails: serverDetails_1.default,
    listServers: listServers_1.default,
    createServer: createServer_1.default,
    suspendServer: suspendServer_1.default,
    unsuspendServer: unsuspendServer_1.default,
    updateBuild: updateBuild_1.default,
    updateDetails: updateDetails_1.default,
    deleteServer: deleteServer_1.default,
    // Nodes
    nodeDetails: nodeDetails_1.default,
    listNodes: listNodes_1.default,
    createNode: createNode_1.default,
    deleteNode: deleteNode_1.default,
    // Database
    listDatabases: listDatabases_1.default,
    databaseDetails: databaseDetails_1.default,
    createDatabase: createDatabase_1.default,
    resetDatabasePassword: resetDatabasePassword_1.default,
    deleteDatabase: deleteDatabase_1.default,
    // Locations
    listLocations: listLocations_1.default,
    deleteLocation: deleteLocation_1.default,
    createLocation: createLocation_1.default,
    updateLocation: updateLocation_1.default,
    locationDetails: locationDetails_1.default,
    // Allocations
    listAllocations: listAllocations_1.default,
    deleteAllocation: deleteAllocation_1.default,
    createAllocation: createAllocation_1.default,
    // Other
    post: post_1.default,
    patch: patch_1.default,
    get: get_1.default,
    put: put_1.default,
    delete: delete_1.default,
};
module.exports = functions;
