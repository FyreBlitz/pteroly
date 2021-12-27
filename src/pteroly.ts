import * as app from "./application/index";
import * as client from "./client/index";
import axios from "axios";
import * as fs from "fs";

(async () => {
	axios({
		url: "https://registry.npmjs.com/pteroly",
		method: "GET",
	}).then((res) => {
		const config = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
		const ver = config.version;
		const verInt = parseInt(ver.split(".").join(""));
		const verlInt = parseInt(res.data['dist-tags'].latest.split(".").join(""))
		
		if (verInt < verlInt) {
			console.log("A new Pteroly version is available!");
			console.log("Latest: " + res.data['dist-tags'].latest);
			console.log("Current: " + ver);
		}
	}).catch((err) => {
		console.log("Couldn't check Pteroly Updates.\nAre you Offline?");
	});
})()

const functions = {
	Client: client,
	Admin:  app,
};
export = functions;