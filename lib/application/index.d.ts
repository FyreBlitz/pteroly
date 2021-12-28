import createuser from './methods/users/createUser';
import getallusers from './methods/users/getAllUsers';
import getuserinfo from './methods/users/getUserInfo';
import updateuser from './methods/users/updateUser';
import deleteuser from './methods/users/deleteUser';
import createserver from './methods/servers/createServer';
import getallservers from './methods/servers/getAllServers';
import updatebuild from './methods/servers/updateBuild';
import updatedetails from './methods/servers/updateDetails';
import deleteserver from './methods/servers/deleteServer';
import suspendserver from './methods/servers/suspendServer';
import unsuspendserver from './methods/servers/unsuspendServer';
import getserverinfo from './methods/servers/getServerInfo';
import createnode from './methods/nodes/createNode';
import getnodeinfo from './methods/nodes/getNodeInfo';
import getallnodes from './methods/nodes/getAllNodes';
import deletenode from './methods/nodes/deleteNode';
import createdatabase from './methods/databases/createDatabase';
import resetdatabasepassword from './methods/databases/resetDatabasePassword';
import getalldatabases from './methods/databases/getAllDatabases';
import getdatabaseinfo from './methods/databases/getDatabaseInfo';
import deletedatabase from './methods/databases/deleteDatabase';
import getallallocations from './methods/allocations/getAllAllocations';
import deleteallocation from './methods/allocations/deleteAllocation';
import createallocation from './methods/allocations/createAllocation';
import post from './methods/post';
import get from './methods/get';
import put from './methods/put';
import del from './methods/delete';
/**
 * @param {String} host Host to connect to
 * @param {String} key Key to use
 * @param {Boolean, String} callback Returns true when login is successful
 */
declare function login(host: string, key: string, callback: any): void;
/**
 *
 * @param {String} host The host to use
 * @param {String} key The application key to use
 * @Warning USE THIS ONLY IF YOU KNOW YOUR CREDENTIALS ARE 100% CORRECT, OR THEY NEVER CHANGE
 */
declare function fastLogin(host: string, key: string): void;
declare const functions: {
    login: typeof login;
    fastLogin: typeof fastLogin;
    getUserInfo: typeof getuserinfo;
    getAllUsers: typeof getallusers;
    updateUser: typeof updateuser;
    createUser: typeof createuser;
    deleteUser: typeof deleteuser;
    getServerInfo: typeof getserverinfo;
    getAllServers: typeof getallservers;
    createServer: typeof createserver;
    suspendServer: typeof suspendserver;
    unsuspendServer: typeof unsuspendserver;
    updateBuild: typeof updatebuild;
    updateDetails: typeof updatedetails;
    deleteServer: typeof deleteserver;
    getNodeInfo: typeof getnodeinfo;
    getAllNodes: typeof getallnodes;
    createNode: typeof createnode;
    createAllocation: typeof createallocation;
    deleteNode: typeof deletenode;
    getAllDatabases: typeof getalldatabases;
    getDatabaseInfo: typeof getdatabaseinfo;
    createDatabase: typeof createdatabase;
    resetDatabasePassword: typeof resetdatabasepassword;
    deleteDatabase: typeof deletedatabase;
    getAllAllocations: typeof getallallocations;
    deleteAllocation: typeof deleteallocation;
    post: typeof post;
    get: typeof get;
    put: typeof put;
    delete: typeof del;
};
export = functions;
