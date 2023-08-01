"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var Request = /** @class */ (function () {
    function Request(host, key) {
        var _this = this;
        this.getRequest = function (path) {
            var url = "".concat(_this.host, "/api/application").concat(path);
            return new Promise(function (resolve, reject) {
                (0, node_fetch_1.default)(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer ".concat(_this.key),
                        "Accept": "Application/vnd.pterodactyl.v1+json"
                    }
                })
                    .then(function (res) { return res.json(); })
                    .then(resolve)
                    .catch(reject);
            });
        };
        this.deleteRequest = function (path) {
            var url = "".concat(_this.host, "/api/application").concat(path);
            return new Promise(function (resolve, reject) {
                (0, node_fetch_1.default)(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer ".concat(_this.key),
                        "Accept": "Application/vnd.pterodactyl.v1+json"
                    }
                })
                    .then(function (res) { return res.json(); })
                    .then(resolve)
                    .catch(reject);
            });
        };
        this.postRequest = function (path, body) {
            var url = "".concat(_this.host, "/api/application").concat(path);
            return new Promise(function (resolve, reject) {
                (0, node_fetch_1.default)(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer ".concat(_this.key),
                        "Accept": "Application/vnd.pterodactyl.v1+json"
                    },
                    body: JSON.stringify(body)
                })
                    .then(function (res) { return res.json(); })
                    .then(resolve)
                    .catch(reject);
            });
        };
        this.patchRequest = function (path, body) {
            var url = "".concat(_this.host, "/api/application").concat(path);
            return new Promise(function (resolve, reject) {
                (0, node_fetch_1.default)(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer ".concat(_this.key),
                        "Accept": "Application/vnd.pterodactyl.v1+json"
                    },
                    body: JSON.stringify(body)
                })
                    .then(function (res) { return res.json(); })
                    .then(resolve)
                    .catch(reject);
            });
        };
        this.putRequest = function (path, body) {
            var url = "".concat(_this.host, "/api/application").concat(path);
            return new Promise(function (resolve, reject) {
                (0, node_fetch_1.default)(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer ".concat(_this.key),
                        "Accept": "Application/vnd.pterodactyl.v1+json"
                    },
                    body: JSON.stringify(body)
                })
                    .then(function (res) { return res.json(); })
                    .then(resolve)
                    .catch(reject);
            });
        };
        this.host = host;
        this.key = key;
    }
    return Request;
}());
exports.default = Request;
