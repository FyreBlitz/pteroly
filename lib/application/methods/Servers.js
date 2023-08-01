"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var Servers = /** @class */ (function () {
    function Servers(hostname, key) {
        var _this = this;
        this.create = function (data) { return _this.req.postRequest("/servers", data); };
        this.updateDetails = function (ID, data) { return _this.req.patchRequest("/servers/".concat(ID, "/details"), data); };
        this.updateBuild = function (ID, data) { return _this.req.patchRequest("/servers/".concat(ID, "/build"), data); };
        this.updateStartup = function (ID, data) { return _this.req.patchRequest("/servers/".concat(ID, "/startup"), data); };
        this.suspend = function (ID) { return _this.req.postRequest("/servers/".concat(ID, "/suspend"), {}); };
        this.unsuspend = function (ID) { return _this.req.postRequest("/servers/".concat(ID, "/unsuspend"), {}); };
        this.reinstall = function (ID) { return _this.req.postRequest("/servers/".concat(ID, "/reinstall"), {}); };
        this.get = function (ID) { return _this.req.getRequest("/servers/".concat(ID, "?include=allocations,user,subusers,pack,nest,egg,variables,location,node,databases")); };
        this.getExternal = function (ExternalID) { return _this.req.getRequest("/servers/external/".concat(ExternalID, "?include=allocations,user,subusers,pack,nest,egg,variables,location,node,databases")); };
        this.list = function (page) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/servers?page=".concat(page || 1, "&include=allocations,user,subusers,pack,nest,egg,variables,location,node,databases"));
        };
        this.delete = function (ID) { return _this.req.deleteRequest("/servers/".concat(ID)); };
        this.forceDelete = function (ID) { return _this.req.deleteRequest("/servers/".concat(ID, "/force")); };
        this.req = new Request_js_1.default(hostname, key);
    }
    return Servers;
}());
exports.default = Servers;
