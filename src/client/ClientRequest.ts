import axios from "axios";

class ClientRequest {
	public host: string;
	public key: string;

	constructor(host: any, key: any) {
		this.host = host;
		this.key = key;
	}

	getRequestUnpaginate = async (url: string, data: string, _data: string): Promise<JSON[]> => {
		let currentPage = 0;

		// Data
		const response = await this.cGetRequest(url + "?page=" + (currentPage + 1));
		let pageData: JSON[] = response.data;

		let totalPages = response.meta.pagination.total_pages;
		currentPage = response.meta.pagination.current_page;
		if (totalPages> currentPage) {
			const pageDataNext = await this.getRequestUnpaginate(url, data, _data)
			pageData = [...pageData, ...pageDataNext];
		}
		return pageData;
	}

	getRequest = (request: string, data: any, _data: any): any => {
		const url: string = getUrl(request, this.host, data, _data);
		if (_data == -1) return this.getRequestUnpaginate(url, data, _data);

		switch(request) {
			case "GetServerStatus": case "GetCPUUsage": case "GetDiskUsage": case "GetMemoryUsage":
				return axios({
					url: url,
					maxRedirects: 5,
					headers: {
						"Authorization": "Bearer " + this.key,
						"Content-Type": "application/json",
						"Accept": "Application/vnd.pterodactyl.v1+json",
					},
				}).then((response) => {
					switch(request) {
						case "GetServerStatus":
							return response.data.attributes.current_state;
						case "GetCPUUsage":
							return response.data.attributes.cpu_absolute;
						case "GetMemoryUsage":
							return response.data.attributes.resources.memory_bytes / 100000;
						case "GetDiskUsage":
							return response.data.attributes.resources.disk_bytes / 100000;
						default:
							if (`${request}`.startsWith("List") || request == "Console") return response.data.data;
							return response.data.attributes;
					}
				}).catch((err) => {
					const error = createError(request, err);
					if (error) throw err;
				});

			default:
				return axios({
					url: url,
					method: "GET",
					maxRedirects: 5,
					headers: {
						"Authorization": "Bearer " + this.key,
						"Content-Type": "application/json",
						"Accept": "Application/vnd.pterodactyl.v1+json",
					},
				}).then((response) => {
					if (request.startsWith("List")) {
						return response.data.data;
					}
					switch(request) {
						case "GetServerInfo":
							return response.data.attributes;
						case "IsOwner":
							return response.data.attributes.server_owner;
						case "GetCPU":
							return response.data.attributes.limits.cpu;
						case "GetMemory":
							return response.data.attributes.limits.memory;
						case "GetDisk":
							return response.data.attributes.limits.disk;
						case "GetServerName":
							return response.data.attributes.name;
						case "GetNummericIP":
							return response.data.attributes.relationships.allocations.data.attributes.ip;
						case "GetServerPort":
							return response.data.attributes.relationships.allocations.data.attributes.port;
						case "GetServerIPAlias":
							return response.data.attributes.relationships.allocations.data.attributes.ip_alias;
						default:
							if (request.startsWith("List") || request == "Console") return response.data.data;
							return response.data.attributes;
					}
				}).catch((err) => {
					const error = createError(request, err);
					if (error) throw error;
				});
		}
	}

	// websocket = async (request: string, data: any, _data: any) => {
	// 	const result = await this.getRequest(request, data, _data).catch((err: any) => console.error(err))
	// 	if (result != null) {
	// 		const { token, socket } = result
	// 		if (token && socket) {
	// 			const webSocket = new WebSocket(socket)
	// 			webSocket.send(JSON.stringify({
	// 				event: "auth",
	// 				args:  [token]
	// 			}));
	// 			webSocket.onmessage = (event) => {
	// 				console.log(event);
	// 			}
	// 			return webSocket;
	// 		}
	// 	}
	// 	return null;
	// }

	postRequest = (request: string, data: any, _data: any) => {
		const url: string = getUrl(request, this.host, data, _data);

		return axios({
			url: url,
			method: "POST",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
			data: data,
		}).then((response) => {
			return response.data;
		}).catch((err) => {
			const error = createError(request, err);
			if (error) throw error;
		});
	}

	deleteRequest = (request: string, data: string, _data: string) => {
		const url: string = getUrl(request, this.host, data, _data);

		return axios({
			url: url,
			method: "DELETE",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
		}).then((response) => {
			return response.data;
		}).catch((err) => {
			const error = createError(request, err);
			if (error) throw error;
		});
	}

	
	cPostRequest = (path: string, body: JSON) => {
		const url: string = this.host + "/api/client/" + path;
		
		return axios({
			url: url,
			method: "POST",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
			data: body,
		}).then((response) => {
			return response.data;
		}).catch((err) => {
			throw err;
		});
	}
	
	cPatchRequest = (path: string, body: JSON) => {
		const url: string = this.host + "/api/client/" + path;
		
		return axios({
			url: url,
			method: "PATCH",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
			data: body,
		}).then((response) => {
			return response.data;
		}).catch((err) => {
			throw err;
		});
	}

	cGetRequest = (path: string) => {
		const url: string = this.host + "/api/client/" + path;
		
		return axios({
			url: url,
			method: "GET",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
		}).then((response) => {
			return response.data;
		}).catch((err) => {
			throw err;
		});
	}

	cDeleteRequest = (path: string) => {
		const url: string = this.host + "/api/client/" + path;
		
		return axios({
			url: url,
			method: "DELETE",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
		}).then((response) => {
			return response.data;
		}).catch((err) => {
			throw err;
		});
	}

	cPutRequest = (path: string, body: JSON) => {
		const url: string = this.host + "/api/client/" + path;
		
		return axios({
			url: url,
			method: "PUT",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
			data: body,
		}).then((response) => {
			return response.data;
		}).catch((err) => {
			throw err;
		});
	}
}

const getUrl = (request: string, host: string, data: any, _data: any): string => {
	switch (request) {
		// Servers
		case "GetServerStatus": case "GetCPUUsage": case "GetMemoryUsage": case "GetDiskUsage":
			return host + "/api/client/servers/" + data + "/resources";
		case "ListServers":
			if (_data != null && _data >= 0) return host + "/api/client?page=" + _data;
			if (_data == -1) return "";
			return host + "/api/client/";
		case "ServerDetails": case "IsOwner": case "GetCPU": case "GetMemory": case "GetDisk": case "GetServerName": 
		case "GetNummericIP": case "GetServerPort": case "GetServerIPAlias":
			return host + "/api/client/servers/" + data;
		case "StartServer": case "StopServer": case "KillServer": case "RestartServer":
			return host + "/api/client/servers/" + data + "/power";
		case "SendCommand":
			return host + "/api/client/servers/" + data + "/command";

		// Backups
		case "CreateBackup": case "ListBackups":
			if (_data != null) return host + "/api/client/servers/" + _data + "/backups";
			return host + "/api/client/servers/" + data + "/backups";
		case "DeleteBackup": case "BackupDetails":
			return host + "/api/client/servers/" + data + "/backups/" + _data;
		case "DownloadBackup":
			return host + "/api/client/servers/" + data + "/backups/" + _data + "/download";
		
		// Other
		case "Console":
			return host + "/api/client/servers/" + data + "/websocket";
		
		default:
			return host + "/api/client/";
	}
}

const createError = (request: any, err: any) => {
	return err;
}

export default ClientRequest;