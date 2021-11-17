const axios = require('axios');

// Tools
function bytesToSize(bytes) {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	if (bytes === 0) return 'n/a'

	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1012)), 10)
	if (i === 0) return `${bytes} ${sizes[i]})`
	return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

class Request {
	constructor(host, key) {
		this.host = host;
		this.key  = key;
	}

	getRequest(request, data, _data) {
		const url = getUrl(request, this.host, data, _data)

		if (request == 'GetServerStatus' || request == 'GetCPUUsage' || request == 'GetDiskUsage' || request == 'GetMemoryUsage') {
			return axios({
				url: url,
				method: 'GET',
				followRedirect: true,
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
			}).then((response) => {
				switch(request) {
					case 'GetServerStatus':
						return response.data.attributes.current_state
					case 'GetCPUUsage':
						return response.data.attributes.cpu_absolute
					case 'GetMemoryUsage':
						return response.data.attributes.resources.memory_bytes / 100000
					case 'GetDiskUsage':
						return response.data.attributes.resources.disk_bytes / 100000
					default:
						if (request.startsWith('GetAll') || request == 'Console') return response.data.data
						return response.data.attributes
				}
			}).catch((err) => {
				const error = createError(request, err)
				if (error) throw err
			})
		} else {
			return axios({
				url: url,
				method: 'GET',
				followRedirect: true,
				maxRedirects: 5,
				headers: {
					'Authorization': 'Bearer ' + this.key,
					'Content-Type': 'application/json',
					'Accept': 'Application/vnd.pterodactyl.v1+json',
				},
			}).then((response) => {
				switch(request) {
					case request.startsWith('GetAll'):
						return response.data.data
					case 'GetServerInfo':
						return response.data.attributes
					case 'IsOwner':
						return response.data.attributes.server_owner
					case 'GetCPU':
						return response.data.attributes.limits.cpu
					case 'GetMemory':
						return response.data.attributes.limits.memory
					case 'GetDisk':
						return response.data.attributes.limits.disk
					case 'GetServerName':
						return response.data.attributes.name
					case 'GetNummericIP':
						return response.data.attributes.relationships.allocations.data.attributes.ip
					case 'GetServerPort':
						return response.data.attributes.relationships.allocations.data.attributes.port
					case 'GetServerIPAlias':
						return response.data.attributes.relationships.allocations.data.attributes.ip_alias
					default:
						if (request.startsWith('GetAll') || request == 'Console') return response.data.data
						return response.data.attributes
				}
			}).catch((err) => {
				const error = createError(request, err)
				if (error) throw error
			})
		}
	}

	async websocket(request, data, _data) {
		const result = await this.getRequest(request, data, _data).catch((err) => console.error(err))
		if (result != null) {
			const { token, socket } = result
			if (token && socket) {
				const webSocket = new WebSocket(socket)
				webSocket.send(JSON.stringify({
					event: 'auth',
					args:  [token]
				}))
				webSocket.onmessage = (event) => {
					console.log(event)
				}
				return webSocket
			}
		}
		return null
	}

	postRequest(request, data, _data) {
		const url = getUrl(request, this.host, data, _data)

		return axios({
			url: url,
			method: 'POST',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
			data: data,
		}).then((response) => {
			return response
		}).catch((err) => {
			const error = createError(request, err)
			if (error) throw error
		})
	}

	deleteRequest(request, data, _data) {
		const url = getUrl(request, this.host, data, _data)

		return axios({
			url: url,
			method: 'DELETE',
			followRedirect: true,
			maxRedirects: 5,
			headers: {
				'Authorization': 'Bearer ' + this.key,
				'Content-Type': 'application/json',
				'Accept': 'Application/vnd.pterodactyl.v1+json',
			},
		}).then((response) => {
			return response
		}).catch((err) => {
			const error = createError(request, err)
			if (error) throw error
		})
	}
}

function getUrl(request, host, data, _data) {
	switch (request) {
		// Servers
		case 'GetAllServers':
			return host + '/api/client/servers'
		case 'GetServerInfo', 'IsOwner', 'GetCPU', 'GetMemory', 'GetDisk', 'GetServerName', 'GetNummericIP', 'GetServerPort', 'GetServerIPAlias':
			return host + '/api/client/servers/' + data
		case 'GetServerStatus', 'GetCPUUsage', 'GetMemoryUsage', 'GetDiskUsage':
			return host + '/api/client/servers/' + data + '/resources'
		case 'StartServer', 'StopServer', 'KillServer', 'RestartServer':
			return host + '/api/client/servers/' + data + '/power'
		case 'SendCommand':
			return host + '/api/client/servers/' + data + '/command'

		// Backups
		case 'CreateBackup', 'GetAllBackups':
			if (_data != null) return host + '/api/client/servers/' + _data + '/backups'
			return host + '/api/client/servers/' + data + '/backups'
		case 'DeleteBackup', 'GetBackupInfo':
			return host + '/api/client/servers/' + data + '/backups/' + _data
		case 'DownloadBackup':
			return host + '/api/client/servers/' + data + '/backups/' + _data + '/download'
		
		// Other
		case 'Console':
			return host + '/api/client/servers/' + data + '/websocket'
		
		default:
			return host + '/api/client/servers'
	}
}

function createError(request, err) {
	return err
}

module.exports = Request
