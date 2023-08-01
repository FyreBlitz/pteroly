"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var Custom = /** @class */ (function () {
    function Custom(hostname, key) {
        var _this = this;
        this.get = function (path) { return _this.req.getRequest(path); };
        this.post = function (path, body) { return _this.req.postRequest(path, body); };
        this.put = function (path, body) { return _this.req.putRequest(path, body); };
        this.delete = function (path) { return _this.req.deleteRequest(path); };
        this.req = new Request_js_1.default(hostname, key);
    }
    return Custom;
}());
exports.default = Custom;
