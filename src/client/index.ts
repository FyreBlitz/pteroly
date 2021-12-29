import axios from 'axios'

// Server Info
import listservers   from './methods/serverInfo/listServers'
import serverdetails   from './methods/serverInfo/serverDetails'
import getserverstatus from './methods/serverInfo/getServerStatus'
import isowner         from './methods/serverInfo/isOwner'
import getnummericip   from './methods/serverInfo/getNummericIP'
import getserverport   from './methods/serverInfo/getServerPort'
import getservername   from './methods/serverInfo/getServerName'
import getipalias      from './methods/serverInfo/getServerIPAlias'

// Server limits
import getcpu    from './methods/serverLimits/getCPU'
import getdisk   from './methods/serverLimits/getDisk'
import getmemory from './methods/serverLimits/getMemory'

// Server Usages
import getcpuusage    from './methods/serverUsage/getCPUUsage'
import getmemoryusage from './methods/serverUsage/getMemoryUsage'
import getdiskusage   from './methods/serverUsage/getDiskUsage'

// Server Actions
import startserver   from './methods/serverActions/startServer'
import stopserver    from './methods/serverActions/stopServer'
import killserver    from './methods/serverActions/killServer'
import restartserver from './methods/serverActions/restartServer'
import sendcommand   from './methods/serverActions/sendCommand'

// Backups
import createbackup   from './methods/backups/createBackup'
import deletebackup   from './methods/backups/deleteBackup'
import downloadbackup from './methods/backups/downloadBackup'
import listbackups  from './methods/backups/listBackups'
import backupdetails  from './methods/backups/backupDetails'

// Custom
import patch from './methods/patch';
import post from './methods/post';
import get from './methods/get';
import put from './methods/put';
import del from './methods/delete';

/**
 *
 * @param {String} host Host to use
 * @param {String} key Client API key
 */
function login(host: string, key: string, callback: any) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.CLIENT_PTEROLY_HOST = host
	process.env.CLIENT_PTEROLY_KEY  = key
	axios.get(host + '/api/client', {
		maxRedirects: 5,
		headers: {
			'Authorization': 'Bearer ' + key,
			'Content-Type': 'application/json',
			'Accept': 'Application/vnd.pterodactyl.v1+json',
		},
	}).then(function(response) {
		if (response.status == 404) {
			callback(false, 'API Key is not valid! (Client)')
		} else {
			callback(true)
		}
	}).catch(error => {
		callback(false, 'API Key is not valid! (Client)')
	})
}

function fastLogin(host: string, key: string) {
	host = host.trim()
	if(host.endsWith('/')) host = host.slice(0, -1)

	process.env.CLIENT_PTEROLY_HOST = host
	process.env.CLIENT_PTEROLY_KEY  = key
}

const functions = {
	login: login,
	fastLogin: fastLogin,

	// Server Info
	getServerName: getservername,
	listServers: listservers,
	serverDetails: serverdetails,
	getCPU: getcpu,
	getMemory: getmemory,
	getDisk: getdisk,
	isOwner: isowner,
	getIPAlias: getipalias,
	getServerPort: getserverport,
	getNummericIP: getnummericip,

	// Server Usage
	getServerStatus: getserverstatus,
	getCPUUsage: getcpuusage,
	getMemoryUsage: getmemoryusage,
	getDiskUsage: getdiskusage,

	// Backups
	createBackup: createbackup,
	deleteBackup: deletebackup,
	// downloadBackup: downloadbackup,
	listBackups: listbackups,
	backupDetails: backupdetails,

	// Server Actions
	startServer: startserver,
	stopServer: stopserver,
	killServer: killserver,
	restartServer: restartserver,
	sendCommand: sendcommand,

	// Other
	post: post,
	patch: patch,
	get: get,
	put: put,
	delete: del,
};
export = functions;