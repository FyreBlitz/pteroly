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
            // Bug Codes
            var bugCodeNew = parseInt(latest.toString()[2]);
            var bugCodeOld = parseInt(version.toString()[2]);
            // Update Codes
            var updCodeNew = parseInt(latest.toString()[1]);
            var updCodeOld = parseInt(version.toString()[1]);
            // Release Codes
            var relCodeNew = parseInt(latest.toString()[0]);
            var relCodeOld = parseInt(version.toString()[0]);
            // Info
            var updateType = "update";
            var updateInfo = "Bug Fixes";

            if (bugCodeNew > bugCodeOld) {
                updateType = "bug fix";
                updateInfo = "Bug Fixes";
            }
            if (updCodeNew > updCodeOld) {
                updateType = "feature update";
                updateInfo = "Bug Fixes/new Features";
            }
            if (relCodeNew > relCodeOld) {
                updateType = "revision";
                updateInfo = "Bug Fixes/New Features/More";
            }

            console.warn("!=== Pteroly ===!");
            console.warn("A new " + updateType + " for Pteroly is available! (" + updateInfo + ")");
            console.warn("You can install it using: npm i pteroly@" + res.data["dist-tags"].latest);
            console.warn("");
            console.warn("Current: " + pjson.version);
            console.warn("Latest: " + res.data["dist-tags"].latest);
            console.warn("!=== Pteroly ===!");
        }
    }).catch((err) => {
        console.warn("!=== Pteroly ===!");
        console.warn("Couldn't check for Updates, are you Offline?");
        console.warn("!=== Pteroly ===!");
    });
})();

const functions = {
	Client: client,
	Admin: app,
};

export = functions;