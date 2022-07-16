

export default class index {
	hostname: string = "";
	key: string = "";

	constructor(hostname: string, key: string) {
		this.hostname = hostname;
		this.key = key;

		if (this.hostname.endsWith("/")) this.hostname = this.hostname.substring(0, this.hostname.length - 1);
	}
	

}