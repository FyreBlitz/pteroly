import listservers from "./methods/serverInfo/listServers";
import serverdetails from "./methods/serverInfo/serverDetails";
import getserverstatus from "./methods/serverInfo/getServerStatus";
import isowner from "./methods/serverInfo/isOwner";
import getnummericip from "./methods/serverInfo/getNummericIP";
import getserverport from "./methods/serverInfo/getServerPort";
import getservername from "./methods/serverInfo/getServerName";
import getipalias from "./methods/serverInfo/getServerIPAlias";
import getcpu from "./methods/serverLimits/getCPU";
import getdisk from "./methods/serverLimits/getDisk";
import getmemory from "./methods/serverLimits/getMemory";
import getcpuusage from "./methods/serverUsage/getCPUUsage";
import getdiskusage from "./methods/serverUsage/getDiskUsage";
import startserver from "./methods/serverActions/startServer";
import stopserver from "./methods/serverActions/stopServer";
import killserver from "./methods/serverActions/killServer";
import restartserver from "./methods/serverActions/restartServer";
import sendcommand from "./methods/serverActions/sendCommand";
import console from "./methods/serverActions/console";
import createbackup from "./methods/backups/createBackup";
import deletebackup from "./methods/backups/deleteBackup";
import listbackups from "./methods/backups/listBackups";
import backupdetails from "./methods/backups/backupDetails";
import patch from "./methods/patch";
import post from "./methods/post";
import get from "./methods/get";
import put from "./methods/put";
import del from "./methods/delete";
/**
 *
 * @param {String} host Host to use
 * @param {String} key Client API key
 * @param {Boolean, String} callback Returns true when login is successful
 * @param {Boolean} caching Enable caching
 */
declare function login(host: string, key: string, callback: (status: boolean, message: string) => any, caching?: boolean): void;
/**
    * @param {String} host Host to use
    * @param {String} key Client API key
    * @param {Boolean} caching Enable caching
    * @Warning USE THIS ONLY IF YOU KNOW YOUR CREDENTIALS ARE 100% CORRECT, OR THEY NEVER CHANGE
*/
declare function fastLogin(host: string, key: string, caching?: boolean): void;
declare const functions: {
    login: typeof login;
    fastLogin: typeof fastLogin;
    getServerName: typeof getservername;
    listServers: typeof listservers;
    serverDetails: typeof serverdetails;
    getCPU: typeof getcpu;
    getMemory: typeof getmemory;
    getDisk: typeof getdisk;
    isOwner: typeof isowner;
    getIPAlias: typeof getipalias;
    getServerPort: typeof getserverport;
    getNummericIP: typeof getnummericip;
    getServerStatus: typeof getserverstatus;
    getCPUUsage: typeof getcpuusage;
    getMemoryUsage: (serverId: string) => Promise<number>;
    getDiskUsage: typeof getdiskusage;
    createBackup: typeof createbackup;
    deleteBackup: typeof deletebackup;
    listBackups: typeof listbackups;
    backupDetails: typeof backupdetails;
    startServer: typeof startserver;
    stopServer: typeof stopserver;
    killServer: typeof killserver;
    restartServer: typeof restartserver;
    sendCommand: typeof sendcommand;
    console: typeof console;
    post: typeof post;
    patch: typeof patch;
    get: typeof get;
    put: typeof put;
    delete: typeof del;
};
export = functions;
