"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_js_1 = require("../Request.js");
var Nests = /** @class */ (function () {
    function Nests(hostname, key) {
        var _this = this;
        this.getNest = function (ID) { return _this.req.getRequest("/nests/".concat(ID)); };
        this.listNests = function (page) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/nests?page=".concat(page || 0));
        };
        this.getEgg = function (NestID, ID) { return _this.req.getRequest("/nests/".concat(NestID, "/eggs/").concat(ID, "?include=nest,servers,config,script,variables")); };
        this.listEggs = function (NestID, page) {
            if (page === void 0) { page = 1; }
            return _this.req.getRequest("/nests/".concat(NestID, "/eggs?include=nest,servers,config,script,variables&page=").concat(page || 0));
        };
        this.req = new Request_js_1.default(hostname, key);
    }
    return Nests;
}());
exports.default = Nests;
