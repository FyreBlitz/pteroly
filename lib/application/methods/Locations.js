"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var Locations = /** @class */ (function () {
    function Locations(hostname, key) {
        var _this = this;
        this.create = function (data) { return _this.req.postRequest("/locations", data); };
        this.update = function (ID, data) { return _this.req.patchRequest("/locations/".concat(ID), data); };
        this.get = function (ID) { return _this.req.getRequest("/locations/".concat(ID)); };
        this.list = function (page) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/locations?page=".concat(page));
        };
        this.delete = function (ID) { return _this.req.deleteRequest("/locations/".concat(ID)); };
        this.req = new Request_js_1.default(hostname, key);
    }
    return Locations;
}());
exports.default = Locations;
