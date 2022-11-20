import axios from "axios";
// const NodeCache = require("node-cache");
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
const reqCache = new CacheContainer(new MemoryStorage());

class ApplicationRequest {
	public host: string | undefined;
	public key: string | undefined;

	constructor(host: string | undefined, key: string | undefined) {
		this.host = host;
		this.key = key;
	}

	getRequest = async (request: string, data: any, _data: any): Promise<any> =>  {
		const url = getUrl(request, this.host, data, _data);
		const cached = await getItem(url);
		if (cached) return cached;

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
				if (_data === true) {
					await setItem(url, response.data);
					return response.data;
				}
				await setItem(url, response.data.data);
				return response.data.data;
			} else if (request == "UserQuery") {
				await setItem(url, response.data.data[0].attributes);
				return response.data.data[0].attributes;
			} else if (_data === true) {
				await setItem(url, response.data);
				return response.data;
			} else {
				await setItem(url, response.data.attributes);
				return response.data.attributes;
			}
		}).catch((err) => {
			throw err;
		});
	}

	postRequest = (request: string, data: any , _data: any): Promise<any> => { // _data is nullable
		const url = getUrl(request, this.host, data, _data);
		
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
			await setItem(url, response.data.attributes);
			return response.data.attributes;
		}).catch((err) => {
			throw err;
		});
	}
	
	patchRequest = (request: string, data: any, _data: any): Promise<any> => { // _data is nullable		
		const url = getUrl(request, this.host, data, _data);

		return axios({
			url: url,
			method: "PATCH",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
			data: data,
		}).then(async (response) => {
			await setItem(url, response.data.attributes);
			return response.data.attributes;
		}).catch((err) => {
			throw err;
		});
	}

	deleteRequest = (request: string, data: any, _data: any): Promise<any> => {
		const url = getUrl(request, this.host, data, _data); // _data is nullable
		
		return axios({
			url: url,
			method: "DELETE",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
		}).then(async () => {
			await setItem(url, null);
			return createObjectSuccess("Deleted successfully");
		}).catch((err) => {
			throw err;
		});
	}

	
	cPostRequest = (path: string, body: any) => {
		const url: string = this.host + "/api/application/" + path;
		// var body = body;
		// if (typeof body != "string") body = JSON.stringify(body);
		
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

	cPatchRequest = (path: string, body: any) => {
		const url: string = this.host + "/api/application/" + path;
		// var body = body;
		// if (typeof body != "string") body = JSON.stringify(body);
		
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

	cGetRequest = async (path: string) => {
		const url: string = this.host + "/api/application/" + path;
		const cached = await reqCache.getItem(url);
		if (cached) return cached;
		
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
		const url: string = this.host + "/api/application/" + path;
		
		return axios({
			url: url,
			method: "DELETE",
			maxRedirects: 5,
			headers: {
				"Authorization": "Bearer " + this.key,
				"Content-Type": "application/json",
				"Accept": "Application/vnd.pterodactyl.v1+json",
			},
		}).then(async () => {
			await setItem(url, null);
			return createObjectSuccess("Deleted successfully");
		}).catch((err) => {
			throw err;
		});
	}

	cPutRequest = (path: string, body: any) => {
		const url: string = this.host + "/api/application/" + path;
		// var body = body;
		// if (typeof body != "string") body = JSON.stringify(body);
		
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

const getUrl = (request: string | undefined, host: string | undefined, data: any, _data: any) => { // _data = nullable
	switch (request) {		
		// User actions
		case "EditUser": case "DeleteUser": case "UserDetails":
			if (_data != null) return host + "/api/application/users/" + _data;
			return host + "/api/application/users/" + data;
		case "UserQuery":
			return host + "/api/application/users?filter=" + data;
		case "CreateUser": case "ListUsers":
			if (_data != null && _data >= 0) return host + "/api/application/users?page=" + _data;
			if (_data == -1) return "users";
			return host + "/api/application/users";
		
		// Server actions
		case "CreateServer":
			if (_data != null) return host + "/api/application/servers?node=" + _data;
			return host + "/api/application/servers";
		case "ListServers": 
			if (_data != null && _data >= 0) return host + "/api/application/servers?page=" + _data;
			if (_data == -1) return "servers";
			return host + "/api/application/servers";
		case "ServerDetails": case "DeleteServer":
			return host + "/api/application/servers/" + data;
		case "UpdateBuild":
			return host + "/api/application/servers/" + _data + "/build";
		case "UpdateDetails":
			return host + "/api/application/servers/" + _data + "/details";
		case "SuspendServer":
			return host + "/api/application/servers/" + _data + "/suspend";
		case "UnsuspendServer":
			return host + "/api/application/servers/" + _data + "/unsuspend";
		case "ReinstallServer":
			return host + "/api/application/servers/" + _data + "/reinstall";
		case "ForceDeleteServer":
			return host + "/api/application/servers/" + data + "/force";
		
		// Node actions
		case "ListNodes": case "CreateNode":
			return host + "/api/application/nodes";
		case "UpdateNode": case "DeleteNode":
			return host + "/api/application/nodes/" + data;
		case "ListAllocations":
			if (_data != null && _data >= 0) return host + "/api/application/nodes/" + data + "/allocations?page=" + _data;
			if (_data == -1) return "nodes/" + data + "/allocations";
			return host + "/api/application/nodes/" + data + "/allocations";
		case "CreateAllocation":
			return host + "/api/application/nodes/" + _data + "/allocations";
		case "DeleteAllocation":
			return host + "/api/application/nodes/" + data + "/allocations/" + _data;
		
		// Database actions
		case "CreateDatabase": case "ListDatabases":
			if (_data != null) return host + "/api/application/servers/" + _data + "/databases";
			return host + "/api/application/servers/" + data + "/databases";
		case "DeleteDatabase": case "DatabaseDetails":
			return host + "/api/application/servers/" + data + "/databases/" + _data;
		case "ResetDatabasePassword":
			return host + "/api/application/servers/" + data + "/databases/" + _data + "/reset-password";

		// Location actions
		case "ListLocations": case "CreateLocation":
			if (_data != null && _data >= 0) return host + "/api/application/locations?page=" + _data;
			if (_data == -1) return "locations";
			return host + "/api/application/locations";
		case "DeleteLocation": case "LocationDetails": case "UpdateLocation":
			if (_data != null) return host + "/api/application/locations/" + _data;
			return host + "/api/application/locations/" + data;
		
		// Nest/Eggs Actions
		case "ListNests":
			return host + "/api/application/nests";
		case "ListEggs":
			return host + "/api/application/nests/" + data + "/eggs";
		case "EggDetails":
			return host + "/api/application/nests/" + data + "/eggs/" + _data;
		case "NestDetails":
			return host + "/api/application/nests/" + data;

		default: return host + "/api/application/";
	}
}

const getItem = (url: string): Promise<any> => {
	const caching = !!process.env.APPLICATION_CACHING;

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
	const caching = !!process.env.APPLICATION_CACHING;
	if (caching)
		await reqCache.setItem(url, data, { ttl: 1 * 60 });
	return true;
}

const createObjectSuccess = (message: string) => {
	return {
		success: true,
		message: message,
	};
}

export default ApplicationRequest;