const axios = require('axios')

// Server Info
const getallservers   = require('./methods/serverInfo/getAllServers.js')
const getserverinfo   = require('./methods/serverInfo/getServerInfo.js')
const getserverstatus = require('./methods/serverInfo/getServerStatus.js')
const isowner         = require('./methods/serverInfo/isOwner.js')
const getnummericip   = require('./methods/serverInfo/getNummericIP.js')
const getserverport   = require('./methods/serverInfo/getServerPort.js')
const getservername   = require('./methods/serverInfo/getServerName.js')
const getipalias      = require('./methods/serverInfo/getServerIPAlias.js')

// Server limits
const getcpu    = require('./methods/serverLimits/getCPU.js')
const getdisk   = require('./methods/serverLimits/getDisk.js')
const getmemory = require('./methods/serverLimits/getMemory.js')

// Server Usages
const getcpuusage    = require('./methods/serverUsage/getCPUUsage.js')
const getmemoryusage = require('./methods/serverUsage/getMemoryUsage.js')
const getdiskusage   = require('./methods/serverUsage/getDiskUsage.js')

// Server Actions
const startserver   = require('./methods/serverActions/startServer.js')
const stopserver    = require('./methods/serverActions/stopServer.js')
const killserver    = require('./methods/serverActions/killServer.js')
const restartserver = require('./methods/serverActions/restartServer.js')
const sendcommand   = require('./methods/serverActions/sendCommand.js')

// Backups
const createbackup   = require('./methods/backups/createBackup.js')
const deletebackup   = require('./methods/backups/deleteBackup.js')
const downloadbackup = require('./methods/backups/downloadBackup.js')
const getallbackups  = require('./methods/backups/getAllBackups.js')
const getbackupinfo  = require('./methods/backups/getBackupInfo.js')

/**
 *
 * @param {String} host Host to use
 * @param {String} key Client API key
 */
function login(host, key, callback) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.CLIENT_NODEACTYL_HOST = host
	process.env.CLIENT_NODEACTYL_KEY  = key
	axios.get(host + '/api/client', {
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
	})
}

function fastLogin(host, key) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.CLIENT_NODEACTYL_HOST = host
	process.env.CLIENT_NODEACTYL_KEY  = key
}

module.exports = {
	login:     login,
	fastLogin: fastLogin,

	// Server Info
	getServerName: getservername,
	getAllServers: getallservers,
	getServerInfo: getserverinfo,
	getCPU:        getcpu,
	getMemory:     getmemory,
	getDisk:       getdisk,
	isOwner:       isowner,
	getIPAlias:    getipalias,
	getServerPort: getserverport,
	getNummericIP: getnummericip,

	// Server Usage
	getServerStatus: getserverstatus,
	getCPUUsage:     getcpuusage,
	getMemoryUsage:  getmemoryusage,
	getDiskUsage:    getdiskusage,

	// Backups
	createBackup:  createbackup,
	deleteBackup:  deletebackup,
	// downloadBackup: downloadbackup,
	getAllBackups: getallbackups,
	getBackupInfo: getbackupinfo,

	// Server Actions
	startServer:   startserver,
	stopServer:    stopserver,
	killServer:    killserver,
	restartServer: restartserver,
	sendCommand:   sendcommand,
}