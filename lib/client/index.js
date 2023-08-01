"use strict";
var axios_1 = require("axios");
// Server Info
var listServers_1 = require("./methods/serverInfo/listServers");
var serverDetails_1 = require("./methods/serverInfo/serverDetails");
var getServerStatus_1 = require("./methods/serverInfo/getServerStatus");
var isOwner_1 = require("./methods/serverInfo/isOwner");
var getNummericIP_1 = require("./methods/serverInfo/getNummericIP");
var getServerPort_1 = require("./methods/serverInfo/getServerPort");
var getServerName_1 = require("./methods/serverInfo/getServerName");
var getServerIPAlias_1 = require("./methods/serverInfo/getServerIPAlias");
// Server limits
var getCPU_1 = require("./methods/serverLimits/getCPU");
var getDisk_1 = require("./methods/serverLimits/getDisk");
var getMemory_1 = require("./methods/serverLimits/getMemory");
// Server Usages
var getCPUUsage_1 = require("./methods/serverUsage/getCPUUsage");
var getMemoryUsage_1 = require("./methods/serverUsage/getMemoryUsage");
var getDiskUsage_1 = require("./methods/serverUsage/getDiskUsage");
// Server Actions
var startServer_1 = require("./methods/serverActions/startServer");
var stopServer_1 = require("./methods/serverActions/stopServer");
var killServer_1 = require("./methods/serverActions/killServer");
var restartServer_1 = require("./methods/serverActions/restartServer");
var sendCommand_1 = require("./methods/serverActions/sendCommand");
var console_1 = require("./methods/serverActions/console");
// Backups
var createBackup_1 = require("./methods/backups/createBackup");
var deleteBackup_1 = require("./methods/backups/deleteBackup");
// import downloadbackup from "./methods/backups/downloadBackup";
var listBackups_1 = require("./methods/backups/listBackups");
var backupDetails_1 = require("./methods/backups/backupDetails");
// Custom
var patch_1 = require("./methods/patch");
var post_1 = require("./methods/post");
var get_1 = require("./methods/get");
var put_1 = require("./methods/put");
var delete_1 = require("./methods/delete");
/**
 *
 * @param {String} host Host to use
 * @param {String} key Client API key
 * @param {Boolean, String} callback Returns true when login is successful
 * @param {Boolean} caching Enable caching
 */
function login(host, key, callback, caching) {
    if (caching === void 0) { caching = true; }
    host = host.trim();
    if (host.endsWith("/"))
        host = host.slice(0, -1);
    host = host.replace("localhost", "127.0.0.1");
    process.env.CLIENT_PTEROLY_HOST = host;
    process.env.CLIENT_PTEROLY_KEY = key;
    process.env.CLIENT_CACHING = caching ? "1" : "";
    axios_1.default.get(host + "/api/client", {
        maxRedirects: 5,
        headers: {
            "Authorization": "Bearer " + key,
            "Content-Type": "application/json",
            "Accept": "Application/vnd.pterodactyl.v1+json",
        },
    }).then(function (response) {
        if ((response === null || response === void 0 ? void 0 : response.status) == 404) {
            callback(false, "API Key is not valid! (Client)");
        }
        else {
            callback(true, "Successfully logged in (Client)");
        }
    }).catch(function () {
        callback(false, "API Key is not valid! (Client)");
    });
}
/**
    * @param {String} host Host to use
    * @param {String} key Client API key
    * @param {Boolean} caching Enable caching
    * @Warning USE THIS ONLY IF YOU KNOW YOUR CREDENTIALS ARE 100% CORRECT, OR THEY NEVER CHANGE
*/
function fastLogin(host, key, caching) {
    if (caching === void 0) { caching = true; }
    host = host.trim();
    if (host.endsWith("/"))
        host = host.slice(0, -1);
    process.env.CLIENT_PTEROLY_HOST = host;
    process.env.CLIENT_PTEROLY_KEY = key;
    process.env.CLIENT_CACHING = caching ? "1" : "";
}
var functions = {
    login: login,
    fastLogin: fastLogin,
    // Server Info
    getServerName: getServerName_1.default,
    listServers: listServers_1.default,
    serverDetails: serverDetails_1.default,
    getCPU: getCPU_1.default,
    getMemory: getMemory_1.default,
    getDisk: getDisk_1.default,
    isOwner: isOwner_1.default,
    getIPAlias: getServerIPAlias_1.default,
    getServerPort: getServerPort_1.default,
    getNummericIP: getNummericIP_1.default,
    // Server Usage
    getServerStatus: getServerStatus_1.default,
    getCPUUsage: getCPUUsage_1.default,
    getMemoryUsage: getMemoryUsage_1.default,
    getDiskUsage: getDiskUsage_1.default,
    // Backups
    createBackup: createBackup_1.default,
    deleteBackup: deleteBackup_1.default,
    // downloadBackup: downloadbackup,
    listBackups: listBackups_1.default,
    backupDetails: backupDetails_1.default,
    // Server Actions
    startServer: startServer_1.default,
    stopServer: stopServer_1.default,
    killServer: killServer_1.default,
    restartServer: restartServer_1.default,
    sendCommand: sendCommand_1.default,
    console: console_1.default,
    // Other
    post: post_1.default,
    patch: patch_1.default,
    get: get_1.default,
    put: put_1.default,
    delete: delete_1.default,
};
module.exports = functions;
