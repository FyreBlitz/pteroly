const axios = require('axios');

// Users
import createuser from './methods/users/createUser'
import getallusers from './methods/users/getAllUsers'
import getuserinfo from './methods/users/getUserInfo'
import updateuser from './methods/users/updateUser'
import deleteuser from './methods/users/deleteUser'

// Servers
import createserver from './methods/servers/createServer'
import getallservers from './methods/servers/getAllServers'
import updatebuild from './methods/servers/updateBuild'
import updatedetails from './methods/servers/updateDetails'
import deleteserver from './methods/servers/deleteServer'
import suspendserver from './methods/servers/suspendServer'
import unsuspendserver from './methods/servers/unsuspendServer'
import getserverinfo from './methods/servers/getServerInfo'

// Nodes
const createnode  = require('./methods/nodes/createNode')
const getnodeinfo = require('./methods/nodes/getNodeInfo')
const getallnodes = require('./methods/nodes/getAllNodes')
const deletenode  = require('./methods/nodes/deleteNode')

// Databases
const createdatabase        = require('./methods/databases/createDatabase')
const resetdatabasepassword = require('./methods/databases/resetDatabasePassword')
const getalldatabases       = require('./methods/databases/getAllDatabases')
const getdatabaseinfo       = require('./methods/databases/getDatabaseInfo')
const deletedatabase        = require('./methods/databases/deleteDatabase')

// Allocations
const getallallocations = require('./methods/allocations/getAllAllocations')
const deleteallocation  = require('./methods/allocations/deleteAllocation')
const createallocation  = require('./methods/allocations/createAllocation')

/**
 * @param {String} host Host to connect to
 * @param {String} key Key to use
 * @param {Boolean, String} callback Returns true when login is successful
 */
function login(host: string, key: string, callback: any) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.APPLICATION_PTEROLY_HOST = host
	process.env.APPLICATION_PTEROLY_KEY  = key

	axios.get(host + '/api/application/users', {
		responseEncoding: 'utf8',
		maxRedirects: 5,
		headers: {
			'Authorization': 'Bearer ' + key,
			'Content-Type': 'application/json',
			'Accept': 'Application/vnd.pterodactyl.v1+json',
		},
	}).then(function(response: any) {
		if (response.status == 404) {
			callback(false, 'API Key is not valid! (Application)')
		} else {
			callback(true)
		}
	}).catch((error: any) => {
		if (error.response.status == 403) {
			callback(false, 'API Key is not valid! (Application)')
		} else {
			throw error
		}
	});
}

/**
 *
 * @param {String} host The host to use
 * @param {String} key The application key to use
 * @Warning USE THIS ONLY IF YOU KNOW YOUR CREDENTIALS ARE 100% CORRECT, OR THEY NEVER CHANGE
 */
function fastLogin(host: string, key: string) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.APPLICATION_PTEROLY_HOST = host
	process.env.APPLICATION_PTEROLY_KEY  = key
}

const functions = {
	login:     login,
	fastLogin: fastLogin,

	// Users
	getUserInfo: getuserinfo,
	getAllUsers: getallusers,
	updateUser:  updateuser,
	createUser:  createuser,
	deleteUser:  deleteuser,

	// Servers
	getServerInfo:   getserverinfo,
	getAllServers:   getallservers,
	createServer:    createserver,
	suspendServer:   suspendserver,
	unsuspendServer: unsuspendserver,
	updateBuild:     updatebuild,
	updateDetails:   updatedetails,
	deleteServer:    deleteserver,

	// Nodes
	getNodeInfo:      getnodeinfo,
	getAllNodes:      getallnodes,
	createNode:       createnode,
	createAllocation: createallocation,
	deleteNode:       deletenode,
	
	// Database
	getAllDatabases:       getalldatabases,
	getDatabaseInfo:       getdatabaseinfo,
	createDatabase:        createdatabase,
	resetDatabasePassword: resetdatabasepassword,
	deleteDatabase:        deletedatabase,

	// Allocations
	getAllAllocations: getallallocations,
	deleteAllocation:  deleteallocation,
};
export = functions;