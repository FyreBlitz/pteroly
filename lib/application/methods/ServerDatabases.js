"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var ServerDatabases = /** @class */ (function () {
    function ServerDatabases(hostname, key) {
        var _this = this;
        this.create = function (ServerID, data) { return _this.req.postRequest("/servers/".concat(ServerID, "/databases"), data); };
        this.resetPassword = function (ServerID, ID, data) { return _this.req.postRequest("/servers/".concat(ServerID, "/databases/").concat(ID, "/reset-password"), data); };
        this.get = function (ServerID, ID) { return _this.req.getRequest("/servers/".concat(ServerID, "/databases/").concat(ID, "?include=password,host")); };
        this.list = function (ServerID, page) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/servers/".concat(ServerID, "/databases?include=password,host&page=").concat(page || 1));
        };
        this.delete = function (ServerID, ID) { return _this.req.deleteRequest("/servers/".concat(ServerID, "/databases/").concat(ID)); };
        this.req = new Request_js_1.default(hostname, key);
    }
    return ServerDatabases;
}());
exports.default = ServerDatabases;
