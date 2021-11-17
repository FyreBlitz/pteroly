const axios = require('axios');

// Users
const createuser  = require('./methods/users/createUser.js')
const getallusers = require('./methods/users/getAllUsers.js')
const getuserinfo = require('./methods/users/getUserInfo.js')
const updateuser  = require('./methods/users/updateUser.js')
const deleteuser  = require('./methods/users/deleteUser.js')

// Servers
const createserver    = require('./methods/servers/createServer.js')
const getallservers   = require('./methods/servers/getAllServers.js')
const updatebuild     = require('./methods/servers/updateBuild.js')
const updatedetails   = require('./methods/servers/updateDetails.js')
const deleteserver    = require('./methods/servers/deleteServer.js')
const suspendserver   = require('./methods/servers/suspendServer.js')
const unsuspendserver = require('./methods/servers/unsuspendServer.js')
const getserverinfo   = require('./methods/servers/getServerInfo.js')

// Nodes
const createnode  = require('./methods/nodes/createNode.js')
const getnodeinfo = require('./methods/nodes/getNodeInfo.js')
const getallnodes = require('./methods/nodes/getAllNodes.js')
const deletenode  = require('./methods/nodes/deleteNode.js')

// Databases
const createdatabase        = require('./methods/databases/createDatabase.js')
const resetdatabasepassword = require('./methods/databases/resetDatabasePassword.js')
const getalldatabases       = require('./methods/databases/getAllDatabases.js')
const getdatabaseinfo       = require('./methods/databases/getDatabaseInfo.js')
const deletedatabase        = require('./methods/databases/deleteDatabase.js')

// Allocations
const getallallocations = require('./methods/allocations/getAllAllocations.js')
const deleteallocation  = require('./methods/allocations/deleteAllocation.js')
const createallocation  = require('./methods/allocations/createAllocation.js')

/**
 * @param {String} host Host to connect to
 * @param {String} key Key to use
 * @param {Boolean, String} callback Returns true when login is successful
 */
function login(host, key, callback) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.APPLICATION_NODEACTYL_HOST = host
	process.env.APPLICATION_NODEACTYL_KEY  = key

	axios.get(host + '/api/application/users', {
		responseEncoding: 'utf8',
		maxRedirects: 5,
		headers: {
			'Authorization': 'Bearer ' + key,
			'Content-Type': 'application/json',
			'Accept': 'Application/vnd.pterodactyl.v1+json',
		},
	}).then(function(response) {
		if (response.status == 404) {
			callback(false, 'API Key is not valid! (Application)')
		} else {
			callback(true)
		}
	}).catch(error => {
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
function fastLogin(host, key) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.APPLICATION_NODEACTYL_HOST = host
	process.env.APPLICATION_NODEACTYL_KEY  = key
}

module.exports = {
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
