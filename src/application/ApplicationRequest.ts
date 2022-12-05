import axios from "axios";
// const NodeCache = require("node-cache");
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
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

class ApplicationRequest {
	public host: string | undefined;
	public key: string | undefined;

	constructor(host: string | undefined, key: string | undefined) {
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

	getRequest = async (request: string, data: any, _data: any, page: number = 0): Promise<any> =>  {
		const url = getUrl(request, this.host, data, _data);

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

	cGetRequest = async (path: string, page: number) => {
		const url: string = (this.host + "/api/application/" + path).replace("//", "/");

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
			return host + "/api/application/users";
		
		// Server actions
		case "CreateServer":
			if (_data != null) return host + "/api/application/servers?node=" + _data;
			return host + "/api/application/servers";
		case "ListServers":
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
	if (caching) {
		let depaginated = await getItem(url + ":depaginated");
		if (depaginated) {
			let depaginatedData = data.data ? data.data : data.attributes ? data.attributes : data;
			depaginated[depaginated.indexOf(depaginatedData)] = depaginatedData;
			await reqCache.setItem(url + ":depaginated", depaginated, { ttl: 10 * 60 });
		}

		await reqCache.setItem(url, data, { ttl: 1 * 60 });
	}
	return true;
}

const createObjectSuccess = (message: string) => {
	return {
		success: true,
		message: message,
	};
}

export default ApplicationRequest;