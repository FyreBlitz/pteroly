"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var Users = /** @class */ (function () {
    function Users(hostname, key) {
        var _this = this;
        this.create = function (data) { return _this.req.postRequest("/users", data); };
        this.update = function (ID, data) { return _this.req.patchRequest("/users/".concat(ID), data); };
        this.get = function (ID) { return _this.req.getRequest("/users/".concat(ID, "?include=servers")); };
        this.getExternal = function (ExternalID) { return _this.req.getRequest("/users/external/".concat(ExternalID, "?include=servers")); };
        this.list = function (page, filters, sortBy) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/users?page=".concat(page || 1, "&include=servers"));
        };
        this.delete = function (ID) { return _this.req.deleteRequest("/users/".concat(ID)); };
        this.req = new Request_js_1.default(hostname, key);
    }
    return Users;
}());
exports.default = Users;
