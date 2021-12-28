import * as app from "./application/index";
import * as client from "./client/index";
import axios from "axios";
const pjson = require('../package.json');

(() => {
    axios({
        method: 'get',
        url: 'https://registry.npmjs.com/pteroly',
    }).then((res) => {
        var version = parseInt(pjson.version.split(".").join(""));
        var latest = parseInt(res.data["dist-tags"].latest.split(".").join(""));
        if (latest > version) {
            console.log("-----| Pteroly |-----");
            console.log("A newer version of Pteroly is available!");
            console.log("You can install it using: npm i pteroly@" + res.data["dist-tags"].latest);
            console.log("");
            console.log("Current: " + pjson.version + "\nLatest: " + res.data["dist-tags"].latest);
            console.log("---------------------");
        }
    });
})();

const functions = {
	Client: client,
	Admin:  app,
};
export = functions;