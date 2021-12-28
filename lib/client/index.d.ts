import getallservers from './methods/serverInfo/getAllServers';
import getserverinfo from './methods/serverInfo/getServerInfo';
import getserverstatus from './methods/serverInfo/getServerStatus';
import isowner from './methods/serverInfo/isOwner';
import getnummericip from './methods/serverInfo/getNummericIP';
import getserverport from './methods/serverInfo/getServerPort';
import getservername from './methods/serverInfo/getServerName';
import getipalias from './methods/serverInfo/getServerIPAlias';
import getcpu from './methods/serverLimits/getCPU';
import getdisk from './methods/serverLimits/getDisk';
import getmemory from './methods/serverLimits/getMemory';
import getcpuusage from './methods/serverUsage/getCPUUsage';
import getdiskusage from './methods/serverUsage/getDiskUsage';
import startserver from './methods/serverActions/startServer';
import stopserver from './methods/serverActions/stopServer';
import killserver from './methods/serverActions/killServer';
import restartserver from './methods/serverActions/restartServer';
import sendcommand from './methods/serverActions/sendCommand';
import createbackup from './methods/backups/createBackup';
import deletebackup from './methods/backups/deleteBackup';
import getallbackups from './methods/backups/getAllBackups';
import getbackupinfo from './methods/backups/getBackupInfo';
import post from './methods/post';
import get from './methods/get';
import put from './methods/put';
import del from './methods/delete';
/**
 *
 * @param {String} host Host to use
 * @param {String} key Client API key
 */
declare function login(host: string, key: string, callback: any): void;
declare function fastLogin(host: string, key: string): void;
declare const functions: {
    login: typeof login;
    fastLogin: typeof fastLogin;
    getServerName: typeof getservername;
    getAllServers: typeof getallservers;
    getServerInfo: typeof getserverinfo;
    getCPU: typeof getcpu;
    getMemory: typeof getmemory;
    getDisk: typeof getdisk;
    isOwner: typeof isowner;
    getIPAlias: typeof getipalias;
    getServerPort: typeof getserverport;
    getNummericIP: typeof getnummericip;
    getServerStatus: typeof getserverstatus;
    getCPUUsage: typeof getcpuusage;
    getMemoryUsage: (serverId: string) => any;
    getDiskUsage: typeof getdiskusage;
    createBackup: typeof createbackup;
    deleteBackup: typeof deletebackup;
    getAllBackups: typeof getallbackups;
    getBackupInfo: typeof getbackupinfo;
    startServer: typeof startserver;
    stopServer: typeof stopserver;
    killServer: typeof killserver;
    restartServer: typeof restartserver;
    sendCommand: typeof sendcommand;
    post: typeof post;
    get: typeof get;
    put: typeof put;
    delete: typeof del;
};
export = functions;
