import * as app from "./application/index";
import * as client from "./client/index";
import * as fs from "fs";
import axios from "axios";
const pjson = require('../package.json');

function parseCfg(cfgString: string) {
    let cfg = {};
    
}

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

            if (bugCodeNew > bugCodeOld) updateType = "bug fix";
            if (updCodeNew > updCodeOld) updateType = "feature update";
            if (relCodeNew > relCodeOld) updateType = "major update";

            if (updateType === "major update"
            && fs.readFileSync("./updateNotify.cfg", "utf8").split(",") === `V:${relCodeNew};SHOWED:true`) 
                return;

            console.warn("!=== Pteroly ===!");
            if (updateType != "major update") console.warn("A new " + updateType + " for Pteroly is available!");
            else console.warn("A new " + updateType + " for Pteroly is available (WARNING: UPDATING TO IT MIGHT BREAK CODE)!");
            console.warn("You can install it using: npm i pteroly@" + res.data["dist-tags"].latest);
            console.warn("");
            console.warn("Current: " + pjson.version);
            console.warn("Latest: " + res.data["dist-tags"].latest);
            if (updateType === "major update") {
                console.warn("Note: This update message will only show up once.");
                fs.writeFileSync(`./updateNotify.cfg`, `V:${relCodeNew};SHOWED:true`);
            }
            console.warn("!=== Pteroly ===!");   
        }
    }).catch((err) => {
        console.warn("!=== Pteroly ===!");
        console.warn("Couldn't check for updates, are you offline?");
        console.warn("!=== Pteroly ===!");
    });
})();

const functions = {
	Client: client,
	Admin: app,
};

export = functions;