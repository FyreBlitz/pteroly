import axios from "axios";
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import { authDataType } from "./methods/serverActions/console";
import { WebsocketClient } from "./Websocket";
const reqCache = new CacheContainer(new MemoryStorage());

const unique = (arr: any) => {
  const uniqueIds: any[] = [];
  arr.filter((element: any) => {
    const isDuplicate = uniqueIds.includes(element);

    if (!isDuplicate) {
      uniqueIds.push(element);
      return true;
    }
    return false;
  });
  return uniqueIds;
};

class ClientRequest {
	public host: string;
	public key: string;

	constructor(host: any, key: any) {
		this.host = host;
		this.key = key;
	}

	depaginateRequest = async (url: string): Promise<any> => {
		const MAX_REQUESTS = 3;
		const firstPage = (await axios({
			url: `${url}?page=1`,
			method: "GET",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
		}))?.data;

		let { total, count } = firstPage.meta.pagination;

		let result = [ ...firstPage.data ];
		let perPageOverwrite = Math.ceil((total - count) >= MAX_REQUESTS * 100 ? (total - count) / MAX_REQUESTS : (total-count)); // Amount of data to fetch per page.
		// get amount of pages to fetch and can't exceed MAX_REQUESTS
		let pagesToFetch = Math.ceil((total - count) / perPageOverwrite) >= MAX_REQUESTS ? MAX_REQUESTS : Math.ceil((total - count) / perPageOverwrite);
		
		for (let i = 0; i < pagesToFetch; i++) {
			const response = await axios({
				url: `${url}?page=${i}&per_page=${perPageOverwrite}`,
				method: "GET",
				maxRedirects: 5,
				headers: {
					"Authorization": "Bearer " + this.key,
					"Content-Type": "application/json",
					"Accept": "Application/vnd.pterodactyl.v1+json",
				},
			});
			result = [ ...result, ...response.data.data ];
		}

		return unique(result);
	}

	getRequest = async (request: string, data: any, _data: any, page: number = 0): Promise<any> => {
		const url: string = getUrl(request, this.host, data, _data);

		const cached = await getItem(page >= 0 ? url : url + ":depaginated");
		if (cached) return cached;

		if (page < 0) {
			const result = new Promise((resolve, reject) => {
				this.depaginateRequest(url).then(async (result) => {
					await setItem(url + ":depaginated", result);
					resolve(result);
				}).catch((err) => {
					reject(err);
				});
			});
			return result;
		}

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
				}).then(async (response) => {
					switch(request) {
						case "GetServerStatus":
							await setItem(url, response.data.attributes.current_state);
							return response.data.attributes.current_state;
						case "GetCPUUsage":
							await setItem(url, response.data.attributes.cpu_absolute);
							return response.data.attributes.cpu_absolute;
						case "GetMemoryUsage":
							return response.data.attributes.resources.memory_bytes / 100000;
						case "GetDiskUsage":
							await setItem(url, response.data.attributes.resources.disk_bytes / 100000);
							return response.data.attributes.resources.disk_bytes / 100000;
						default:
							if (`${request}`.startsWith("List") || request == "Console") {
								await setItem(url, response.data.data);
								return response.data.data;
							}
							await setItem(url, response.data.attributes);
							return response.data.attributes;
					}
				}).catch((err) => {
					throw err;
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
				}).then(async (response) => {
					if (request.startsWith("List")) {
						await setItem(url, response.data.data);
						return response.data.data;
					}
					switch(request) {
						case "GetServerInfo":
							await setItem(url, response.data.attributes);
							return response.data.attributes;
						case "IsOwner":
							await setItem(url, response.data.attributes.is_owner);
							return response.data.attributes.server_owner;
						case "GetCPU":
							await setItem(url, response.data.attributes.limits.cpu);
							return response.data.attributes.limits.cpu;
						case "GetMemory":
							await setItem(url, response.data.attributes.limits.memory);
							return response.data.attributes.limits.memory;
						case "GetDisk":
							await setItem(url, response.data.attributes.limits.disk);
							return response.data.attributes.limits.disk;
						case "GetServerName":
							await setItem(url, response.data.attributes.name);
							return response.data.attributes.name;
						case "GetNummericIP":
							await setItem(url, response.data.attributes.relationships.allocations.data[0].attributes.ip);
							return response.data.attributes.relationships.allocations.data[0].attributes.ip;
						case "GetServerPort":
							await setItem(url, response.data.attributes.relationships.allocations.data[0].attributes.port);
							return response.data.attributes.relationships.allocations.data[0].attributes.port;
						case "GetServerIPAlias":
							await setItem(url, response.data.attributes.relationships.allocations.data[0].attributes.ip_alias);
							return response.data.attributes.relationships.allocations.data[0].attributes.ip_alias;
						default:
							if (request.startsWith("List") || request == "Console") return response.data.data;
							return response.data.attributes;
					}
				}).catch((err) => {
					throw err;
				});
		}
	}

	websocket = async (request: string, data: any, _data: any) => {
		const authData = await this.getRequest(request, data, _data) as authDataType;
		return new WebsocketClient(authData, this.getRequest.bind(undefined, request, data, _data));
	}

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
		}).then(async (response) => {
			await setItem(url, response.data);
			return response.data;
		}).catch((err) => {
			throw err;
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
		}).then(async (response) => {
			await setItem(url, null);
			return response.data;
		}).catch((err) => {
			throw err;
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
		}).then(async (response) => {
			await setItem(url, response.data);
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
		}).then(async (response) => {
			await setItem(url, response.data);
			return response.data;
		}).catch((err) => {
			throw err;
		});
	}

	cGetRequest = async (path: string, page: number = 0) => {
		const url: string = this.host + "/api/client/" + path;

		const cached = await getItem(page >= 0 ? url : url + ":depaginated");
		if (cached) return cached;

		if (page < 0) {
			const result = new Promise((resolve, reject) => {
				this.depaginateRequest(1, url).then(async (result) => {
					await setItem(url + ":depaginated", result);
					resolve(result);
				}).catch((err) => {
					reject(err);
				});
			});
			return result;
		}
		
		return axios({
			url: url,
			method: "GET",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
		}).then(async (response) => {
			await setItem(url, response.data);
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
		}).then(async (response) => {
			await setItem(url, null);
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
		}).then(async (response) => {
			await setItem(url, response.data);
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
			return host + "/api/client/servers/" + _data + "/power";
		case "SendCommand":
			return host + "/api/client/servers/" + _data + "/command";

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

const getItem = (url: string): Promise<any> => {
	const caching = !!process.env.CLIENT_CACHING;

	const result = new Promise((resolve, reject) => {
		reqCache.getItem(url).then((value) => {
			if (value && caching) {
				resolve(value);
			} else {
				resolve(null);
			}
		}).catch((err) => {
			reject(err);
		});
	});

	return result;
}

const setItem = async (url: string, data: any) => {
	const caching = !!process.env.CLIENT_CACHING;
	if (caching) {
		let depaginated = await getItem(url + ":depaginated");
		if (depaginated) {
			let depaginatedData = data.data ? data.data : data.attributes ? data.attributes : data;
			depaginated[depaginated.indexOf(depaginatedData)] = depaginatedData;
			await reqCache.setItem(url + ":depaginated", depaginated, { ttl: 10 * 60 });
		}
		
		await reqCache.setItem(url, data, { ttl: !url.endsWith(":depaginated") ? 1 * 60 : 10 * 60 });
	}
	return true;
}

export default ClientRequest;
