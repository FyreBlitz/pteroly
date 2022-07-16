import fetch from "node-fetch";

export default class Request {
	public host: string;
	public key: string;

	constructor(host: string, key: string) {
		this.host = host;
		this.key = key;
	}

	getRequest = (path: string): Promise<any> => {
		const url: string = `${this.host}/api/application${path}`;
		
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.key}`,
					"Accept": "Application/vnd.pterodactyl.v1+json"
				}
			})
			.then(res => res.json())
			.then(resolve)
			.catch(reject);
		});
	}

	deleteRequest = (path: string): Promise<any> => {
		const url: string = `${this.host}/api/application${path}`;
		
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.key}`,
					"Accept": "Application/vnd.pterodactyl.v1+json"
				}
			})
			.then(res => res.json())
			.then(resolve)
			.catch(reject);
		});
	}


	postRequest = (path: string, body: any): Promise<any> => {
		const url: string = `${this.host}/api/application${path}`;
		
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.key}`,
					"Accept": "Application/vnd.pterodactyl.v1+json"
				},
				body: JSON.stringify(body)
			})
			.then(res => res.json())
			.then(resolve)
			.catch(reject);
		});
	}

	patchRequest = (path: string, body: any): Promise<any> => {
		const url: string = `${this.host}/api/application${path}`;
		
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.key}`,
					"Accept": "Application/vnd.pterodactyl.v1+json"
				},
				body: JSON.stringify(body)
			})
			.then(res => res.json())
			.then(resolve)
			.catch(reject);
		});
	}

	putRequest = (path: string, body: any): Promise<any> => {
		const url: string = `${this.host}/api/application${path}`;
		
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.key}`,
					"Accept": "Application/vnd.pterodactyl.v1+json"
				},
				body: JSON.stringify(body)
			})
			.then(res => res.json())
			.then(resolve)
			.catch(reject);
		});
	}
}