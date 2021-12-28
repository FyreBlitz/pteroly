"use strict";
var app = require("./application/index");
var client = require("./client/index");
var axios_1 = require("axios");
var pjson = require('../package.json');
(function () {
    (0, axios_1.default)({
        method: 'get',
        url: 'https://registry.npmjs.com/pteroly',
    }).then(function (res) {
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
var functions = {
    Client: client,
    Admin: app,
};
module.exports = functions;
