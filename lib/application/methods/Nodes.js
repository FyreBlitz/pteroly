"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var Nodes = /** @class */ (function () {
    function Nodes(hostname, key) {
        var _this = this;
        this.create = function (data) { return _this.req.postRequest("/nodes", data); };
        this.update = function (ID, data) { return _this.req.patchRequest("/nodes/".concat(ID), data); };
        this.get = function (ID) { return _this.req.getRequest("/nodes/".concat(ID)); };
        this.getConfig = function (ID) { return _this.req.getRequest("/nodes/".concat(ID, "/configuration")); };
        this.list = function (page) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/nodes?page=".concat(page || 0));
        };
        this.delete = function (ID) { return _this.req.deleteRequest("/nodes/".concat(ID)); };
        this.req = new Request_js_1.default(hostname, key);
    }
    return Nodes;
}());
exports.default = Nodes;
