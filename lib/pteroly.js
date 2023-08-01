"use strict";
var app = require("./application/index");
var client = require("./client/index");
var fs = require("fs");
var axios_1 = require("axios");
var path = require("path");
var pjson = require('../package.json');
function convertCfgToJson(cfgString) {
    var cfg = {};
    var lines = cfgString.split("\n");
    var childTmp = {};
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].toString().replace("\r", "");
        if (line.startsWith("#"))
            continue;
        if (line.length == 0)
            continue;
        if (line.endsWith(":") && JSON.stringify(childTmp) == "{}")
            childTmp["PARENT"] = line.substring(0, line.length - 1);
        if (line.endsWith(":") && JSON.stringify(childTmp) != "{}") {
            var parent_1 = childTmp["PARENT"];
            delete childTmp["PARENT"];
            cfg[parent_1] = childTmp;
            childTmp = {};
            childTmp["PARENT"] = line.substring(0, line.length - 1);
        }
        if (line.startsWith("  "))
            childTmp[line.split("=")[0].trim()] = line.split("=")[1].trim();
    }
    var parent = childTmp["PARENT"];
    delete childTmp["PARENT"];
    cfg[parent] = childTmp;
    return cfg;
}
// let cfgAsJson = convertCfgToJson(fs.readFileSync(__dirname + "\\config.cfg", "utf8"));
// console.log(cfgAsJson)
function convertJsonToCfg(cfg) {
    var cfgString = "# DON'T TOUCH THE MAJORNOTIFY CONFIG. (Automatically generated)\n# THIS CONFIG FILE IS SPACE, LINE AND NAME SENSITIVE, EDITING IT IN THE WRONG WAY POSSIBLY BREAKS IT.\n";
    for (var key in cfg) {
        if (cfg[key] == "[object Object]") {
            cfgString += "\n" + key + ":\n";
            for (var childKey in cfg[key]) {
                cfgString += "  " + childKey + "=" + cfg[key][childKey] + "\n";
            }
        }
    }
    return cfgString;
}
// let cfgFromJson = convertJsonToCfg(cfgAsJson);
// console.log(cfgFromJson);
(function () {
    (0, axios_1.default)({
        method: 'get',
        url: 'https://registry.npmjs.com/pteroly',
    }).then(function (res) {
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
            var cfgAsJson = convertCfgToJson(fs.readFileSync(path.join(__dirname + "/config.cfg"), "utf8"));
            if (bugCodeNew > bugCodeOld) {
                if (cfgAsJson["VERSIONNOTIFY"]["notifyBugFixes"] == "no")
                    return;
                updateType = "bug fix";
            }
            if (updCodeNew > updCodeOld) {
                if (cfgAsJson["VERSIONNOTIFY"]["notifyFeatureUpdates"] == "no")
                    return;
                updateType = "feature update";
            }
            if (relCodeNew > relCodeOld) {
                if (cfgAsJson["VERSIONNOTIFY"]["notifyMajorUpdates"] == "no")
                    return;
                if (cfgAsJson["MAJORNOTIFY"]["versionNumber"] == relCodeNew
                    && cfgAsJson["MAJORNOTIFY"]["shown"] == "yes")
                    return;
                updateType = "major update";
            }
            console.warn("!=== Pteroly ===!");
            if (updateType !== "major update")
                console.warn("A new " + updateType + " for Pteroly is available!");
            else
                console.warn("A new " + updateType + " for Pteroly is available (WARNING: UPDATING TO IT MIGHT BREAK CODE)!");
            console.warn("You can install it using: npm i pteroly@" + res.data["dist-tags"].latest);
            console.warn("");
            console.warn("Current: " + pjson.version);
            console.warn("Latest: " + res.data["dist-tags"].latest);
            if (updateType === "major update") {
                console.warn("Note: This update message will only show up once.");
                cfgAsJson["MAJORNOTIFY"]["versionNumber"] = relCodeNew;
                cfgAsJson["MAJORNOTIFY"]["shown"] = "yes";
                var jsonAsCfg = convertJsonToCfg(cfgAsJson);
                fs.writeFileSync("./config.cfg", jsonAsCfg);
            }
            console.warn("!=== Pteroly ===!");
        }
    }).catch(function () {
        console.warn("!=== Pteroly ===!");
        console.warn("Couldn't check for updates, are you offline?");
        console.warn("!=== Pteroly ===!");
    });
})();
var functions = {
    Client: client,
    Admin: app,
};
module.exports = functions;
