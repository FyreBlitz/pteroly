import createuser from './methods/users/createUser';
import listusers from './methods/users/listUsers';
import userdetails from './methods/users/userDetails';
import userquery from './methods/users/userQuery';
import updateuser from './methods/users/updateUser';
import deleteuser from './methods/users/deleteUser';
import createserver from './methods/servers/createServer';
import listservers from './methods/servers/listServers';
import updatebuild from './methods/servers/updateBuild';
import updatedetails from './methods/servers/updateDetails';
import deleteserver from './methods/servers/deleteServer';
import suspendserver from './methods/servers/suspendServer';
import unsuspendserver from './methods/servers/unsuspendServer';
import serverdetails from './methods/servers/serverDetails';
import createnode from './methods/nodes/createNode';
import nodedetails from './methods/nodes/nodeDetails';
import listnodes from './methods/nodes/listNodes';
import deletenode from './methods/nodes/deleteNode';
import createdatabase from './methods/databases/createDatabase';
import resetdatabasepassword from './methods/databases/resetDatabasePassword';
import listdatabases from './methods/databases/listDatabases';
import databasedetails from './methods/databases/databaseDetails';
import deletedatabase from './methods/databases/deleteDatabase';
import listallocations from './methods/allocations/listAllocations';
import deleteallocation from './methods/allocations/deleteAllocation';
import createallocation from './methods/allocations/createAllocation';
import listlocations from './methods/locations/listLocations';
import deletelocation from './methods/locations/deleteLocation';
import createlocation from './methods/locations/createLocation';
import updatelocation from './methods/locations/updateLocation';
import locationdetails from './methods/locations/locationDetails';
import post from './methods/post';
import patch from './methods/patch';
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
    userDetails: typeof userdetails;
    listUsers: typeof listusers;
    updateUser: typeof updateuser;
    createUser: typeof createuser;
    deleteUser: typeof deleteuser;
    userQuery: typeof userquery;
    serverDetails: typeof serverdetails;
    listServers: typeof listservers;
    createServer: typeof createserver;
    suspendServer: typeof suspendserver;
    unsuspendServer: typeof unsuspendserver;
    updateBuild: typeof updatebuild;
    updateDetails: typeof updatedetails;
    deleteServer: typeof deleteserver;
    nodeDetails: typeof nodedetails;
    listNodes: typeof listnodes;
    createNode: typeof createnode;
    deleteNode: typeof deletenode;
    listDatabases: typeof listdatabases;
    databaseDetails: typeof databasedetails;
    createDatabase: typeof createdatabase;
    resetDatabasePassword: typeof resetdatabasepassword;
    deleteDatabase: typeof deletedatabase;
    listLocations: typeof listlocations;
    deleteLocation: typeof deletelocation;
    createLocation: typeof createlocation;
    updateLocation: typeof updatelocation;
    locationDetails: typeof locationdetails;
    listAllocations: typeof listallocations;
    deleteAllocation: typeof deleteallocation;
    createAllocation: typeof createallocation;
    post: typeof post;
    patch: typeof patch;
    get: typeof get;
    put: typeof put;
    delete: typeof del;
};
export = functions;
